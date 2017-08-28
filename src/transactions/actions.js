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
    let data = Object.assign({
      'ticket': localStorage.getItem('ticket'),
    }, filter);
    return dispatch => {
      dispatch({type: constants.TRANSACTIONS_FETCH_LIST});
      return getData(5, data, 'balance_transaction.list').then((response)=> {
        if (response.ok) {
          result.getList(response, dispatch, data.max_count);
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
      });
    }
  },
  updateFilter: function(filter, field, value) {
    console.log(filter)
  }
};