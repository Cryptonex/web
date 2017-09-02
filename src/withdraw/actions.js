import constants from 'base/constants';
import { getData } from 'base/settings';


let result = {
  submit: (response, dispatch) => {
    return response.json().then(json => {
      if (json.error) {
        return dispatch({
          type: constants.WITHDRAW_FETCH_FORM_ERROR,
          payload: {
            error: 'Error send!'
          }
        });
      }
      return dispatch({
        type: constants.WITHDRAW_FETCH_FORM_SUCCESS,
        payload: {
          cnx: json.result
        }
      });

    });
  }
};

export let submit = form => {
  let params = Object.assign({
    ticket: localStorage.getItem('ticket'),
  }, form);
  return dispatch => {
    if (!params.amount || !params.to_hash) {
      return dispatch({
        type: constants.WITHDRAW_FORM_ERROR,
        payload: {
          error: 'Fill in all the fields!'
        }
      })
    }
    params.amount = params.amount.replace(',', '.');
    if (!Number(params.amount)) {
      return dispatch({
        type: constants.WITHDRAW_FORM_ERROR,
        payload: {
          error: 'Amount should be numeric!'
        }
      })
    }

    params.amount = Number(params.amount)

    dispatch({type: constants.WITHDRAW_FETCH_FORM});

    return getData(1, params, 'account.withdraw').then(response => {
      if (response.ok) {
        result.submit(response, dispatch);
      } else {
        return response.json().then(json => {
          return dispatch({
            type: constants.WITHDRAW_FETCH_FORM_ERROR,
            payload: {
              error: 'Unknown error!',
            }
          });
        });
      }
    }).catch(error => {
      console.log(error)
      return dispatch({
        type: constants.WITHDRAW_FETCH_FORM_ERROR,
        payload: {
          error: 'Unknown error!',
        }
      });
    });
  }
};

export let updateForm = (field, value) => {
  return {
    type: constants.WITHDRAW_UPDATE_FORM,
    payload: {
      field,
      value
    }
  }
};