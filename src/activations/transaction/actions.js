import constants from 'base/constants';
import { getData } from 'base/settings';

let result = {
  confirmTransaction: (response, dispatch) => {
    return response.json().then(json => {
      if (json.error) {
        return dispatch({
          type: constants.ACTIVATIONS_TRANSACTION_FETCH_CODE_ERROR,
        });
      }
      return dispatch({
        type: constants.ACTIVATIONS_TRANSACTION_FETCH_CODE_SUCCESS,
      });
    });
  }
};

export let confirmTransaction = (code)=> {
  return dispatch => {

    let params = {
      code: code,
    };

    dispatch({type: constants.ACTIVATIONS_TRANSACTION_FETCH_CODE});

    return getData(1, params, 'user.transaction_confirm').then(response => {
      if (response.ok) {
        result.confirmTransaction(response, dispatch);
      } else {
        return response.json().then(json => {
          return dispatch({
            type: constants.ACTIVATIONS_TRANSACTION_FETCH_CODE_ERROR,
          });
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }
};