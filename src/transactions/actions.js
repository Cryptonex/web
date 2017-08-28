import constants from 'base/constants';
import { getData } from 'base/settings';
import moment from 'moment';

let result = {
  getList: (response, dispatch, max_count) => {
    return response.json().then(json => {
      if (json.error) {
        console.log(json);
        return dispatch({
          type: constants.TRANSACTIONS_FETCH_LIST_ERROR,
          payload: json.error
        });
      }

      let page_count = Math.floor(json.result.summary.total / max_count);
      return dispatch({
        type: constants.TRANSACTIONS_FETCH_LIST_SUCCESS,
        payload: {
          transactions: json.result.transactions,
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

export default {
  getList: function(filter) {
    let params = Object.assign({
      ticket: localStorage.getItem('ticket')
    }, filter);

    for (let prop in params) {
      if (!params[prop]) {
        delete params[prop];
      }
    }


    return dispatch => {
      dispatch({type: constants.TRANSACTIONS_FETCH_LIST});
      return getData(5, params, 'balance_transaction.list').then((response)=> {
        if (response.ok) {
          result.getList(response, dispatch, params.max_count);
        } else {
          return response.json().then(function (json) {
            return dispatch({
              type: constants.TRANSACTIONS_FETCH_LIST_ERROR,
              payload: json
            });
          });
        }
      }).catch(error => {
        console.log(error);
        return dispatch({
          type: constants.TRANSACTIONS_FETCH_LIST_ERROR
        });
      });
    }
  },
  updateFilter: function(filter, field, value) {
    let newFilter = Object.assign({}, filter);

    if (field == 'date' && !value) {
      newFilter.start_stamp = '';
      newFilter.end_stamp = '';
    }

    if (field == 'date' && value) {
      newFilter.end_stamp = moment().add(1, 'day').startOf('day').format('YYYY-MM-DD');
      newFilter.start_stamp = moment().startOf(value).format('YYYY-MM-DD');
    }

    if (field == 'status') {
      newFilter.status = value;
    }

    return dispatch => {
      dispatch({
        type: constants.TRANSACTIONS_UPDATE_FILTER,
        payload: {
          filter: newFilter
        }
      });
      dispatch(this.getList(newFilter));
    }
  },
  updateList: function(filter, page) {
    let newFilter = Object.assign({}, filter);
    newFilter.offset = newFilter.max_count * (page - 1);
    if (page == 1) {
      newFilter.offset = '';
    }
    return dispatch => {
      dispatch({
        type: constants.TRANSACTIONS_UPDATE_LIST,
        payload: {
          page
        }
      });

      dispatch(this.getList(newFilter));
    }
  }
};