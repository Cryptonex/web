import constants from 'base/constants';
import { getData } from 'base/settings';
import moment from 'moment';
import { alert } from 'elements/alerts/index';


let result = {
  getList: (response, dispatch, max_count) => {
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
  }
};

export let getList = (filter) => {
  let params = Object.assign({
    ticket: localStorage.getItem('ticket')
  }, filter);

  for (let prop in params) {
    if (!params[prop]) {
      delete params[prop];
    }
  }


  return dispatch => {
    dispatch({type: constants.REFERRAL_FETCH_USER_LIST});
    return getData(5, params, 'transaction.referer_list').then((response)=> {
      if (response.ok) {
        result.getList(response, dispatch, params.max_count);
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


export let updateFilter = (filter, field, value) => {
  let newFilter = Object.assign({}, filter);

  if (field == 'date' && !value) {
    newFilter.start_stamp = '';
    newFilter.end_stamp = '';
  }

  if (field == 'date' && value) {
    newFilter.end_stamp = moment().add(1, 'day').startOf('day').format('YYYY-MM-DD');
    newFilter.start_stamp = moment().startOf(value).format('YYYY-MM-DD');
    if (value == 'last_month') {
      newFilter.end_stamp = moment().add(1, 'day').startOf('day').format('YYYY-MM-DD');
      newFilter.start_stamp = moment().add(-1, 'month').startOf('day').format('YYYY-MM-DD');
    }
  }

  if (field == 'status') {
    newFilter.status = value;
  }

  return dispatch => {
    dispatch({
      type: constants.REFERRAL_UPDATE_FILTER,
      payload: {
        filter: newFilter
      }
    });

    dispatch(getList(newFilter));
  }
};

export let updateList = (filter, page) => {
  let newFilter = Object.assign({}, filter);
  newFilter.offset = newFilter.max_count * (page - 1);

  if (page == 1) {
    newFilter.offset = '';
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
