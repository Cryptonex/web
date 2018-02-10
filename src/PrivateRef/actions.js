import constants from 'base/constants';
import { getData } from 'base/settings';
import moment from 'moment';
import { fetchRefInfo } from "../api/userApi";
import { generateArrayConst } from "../base/utils";
import { alert } from 'elements/alerts/index';

const getListSuccess = (response, dispatch, max_count) => {
  return response.json().then(json => {
    if (json.error) {
      console.log(json);
      return dispatch({
        type: constants.REFERRAL_FETCH_USER_LIST_ERROR,
        payload: json.error
      });
    }

    let page_count = Math.ceil(json.result.summary.total / max_count);

    let transations = Object.assign({}, json).result.transactions.sort((first, second) => {
      return moment(second.update_stamp).valueOf() - moment(first.update_stamp).valueOf()
    });

    return dispatch({
      type: constants.REFERRAL_FETCH_USER_LIST_SUCCESS,
      payload: {
        transactions: transations,
        pagination: {
          max_count,
          total: json.result.summary.total,
          page_count
        }
      }
    });
  });
};

export let getList = (pagination) => {
  let params = Object.assign({
    ticket: localStorage.getItem('ticket')
  }, pagination);

  if (!pagination.offset) {
    delete params.offset;
  }

  return dispatch => {
    dispatch({type: constants.REFERRAL_FETCH_USER_LIST});
    return getData(5, params, 'transaction.referer_list').then((response)=> {
      if (response.ok) {
        getListSuccess(response, dispatch, params.max_count);
      } else {
        return response.json().then(function (json) {
          return dispatch({
            type: constants.REFERRAL_FETCH_USER_LIST_ERROR,
            payload: json
          });
        });
      }
    }).catch(error => {
      console.log(error);
      return dispatch({
        type: constants.REFERRAL_FETCH_USER_LIST_ERROR
      });
    });
  }
};

export let updateList = (filter, page) => {
  let newFilter = Object.assign({}, filter);
  newFilter.offset = newFilter.max_count * (page - 1);

  if (page == 1) {
    newFilter.offset = 0;
  }

  return dispatch => {
    dispatch({
      type: constants.REFERRAL_UPDATE_LIST,
      payload: {
        page
      }
    });

    dispatch(getList(newFilter));
  }
};

export const loadInfoRef = () => {
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.FETCH_REF_INFO),
      response: fetchRefInfo(),
    },
  };
};

