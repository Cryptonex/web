import constants from 'base/constants';
import { getData } from 'base/settings';
import { translate } from "../base/utils";

let result = {
  submit: (response, dispatch) => {
    return response.json().then(json => {
      if (json.error) {
        return dispatch({
          type: constants.WITHDRAW_FETCH_FORM_ERROR,
          payload: {
            error: translate('error.error_send')
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

export let submit = (form, status) => {
  let params = Object.assign({
    ticket: localStorage.getItem('ticket'),
  }, form);
  return dispatch => {

    if (status && !form.auth_2fa_code) {
      return dispatch({
        type: constants.WITHDRAW_FORM_ERROR,
        payload: {
          error: translate('error.fill_all_field')
        }
      })
    }

    if (status && !Number(form.auth_2fa_code) && form.auth_2fa_code.length !=6) {
      return dispatch({
        type: constants.WITHDRAW_FORM_ERROR,
        payload: {
          error: translate('error.invalid_format', { field: translate('form.auth_code')})
        }
      })
    }

    if (!params.amount || !params.to_hash) {
      return dispatch({
        type: constants.WITHDRAW_FORM_ERROR,
        payload: {
          error: translate('error.fill_all_field')
        }
      });
    }
    params.amount = params.amount.replace(',', '.');
    if (!Number(params.amount)) {
      return dispatch({
        type: constants.WITHDRAW_FORM_ERROR,
        payload: {
          error: translate('error.should_num', { field: translate('form.amount')})
        }
      })
    }

    if (status) {
      params.auth_2fa_code = Number(params.auth_2fa_code)
    } else {
      delete params.auth_2fa_code;
    }

    dispatch({type: constants.WITHDRAW_FETCH_FORM});

    return getData(1, params, 'account.withdraw').then(response => {
      if (response.ok) {
        result.submit(response, dispatch);
      } else {
        return response.json().then(json => {
          return dispatch({
            type: constants.WITHDRAW_FETCH_FORM_ERROR,
            payload: {
              error: translate('error.unknown_error'),
            }
          });
        });
      }
    }).catch(error => {
      return dispatch({
        type: constants.WITHDRAW_FETCH_FORM_ERROR,
        payload: {
          error: translate('error.unknown_error'),
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
  };
};
