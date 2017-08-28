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
      });

    });
  }
};


export default {
  updateForm: (field, value) => {
    return {
      type: constants.WITHDRAW_UPDATE_FORM,
      payload: {
        field,
        value
      }
    }
  },
  submit: form => {
    let params = Object.assign({
      ticket: localStorage.getItem('ticket'),
    }, form);
    return dispatch => {
      if (!params.amount || !params.address) {
        return dispatch({
          type: constants.WITHDRAW_FORM_ERROR,
          payload: {
            error: 'Fill in all the fields!'
          }
        })
      }

      if (!Number(params.amount)) {
        return dispatch({
          type: constants.WITHDRAW_FORM_ERROR,
          payload: {
            error: 'Amount should be numeric!'
          }
        })
      }


      dispatch({type: constants.USERS_LOGIN_FETCH_FORM});

      return getData(1, params, 'account.withdraw').then(response => {
        if (response.ok) {
          result.submit.submit(response, dispatch);
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
        return dispatch({
          type: constants.WITHDRAW_FETCH_FORM_ERROR,
          payload: {
            error: 'Unknown error!',
          }
        });
      });
    }
  }
}