import constants from 'base/constants';
import { getData } from 'base/settings';
import { translate } from "base/utils";

export let updateForm = (field, value) => {
  return {
    type: constants.USERS_SETTINGS_PASSWORD_UPDATE_FORM,
    payload: {
      field,
      value
    }
  }
};


let result = {
  submit: (response, dispatch) => {
    return response.json().then( json => {
      if (json.error) {
        return dispatch({
          type: constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_ERROR,
          payload: {
            error: translate('error.fail_change_pwd')
          }
        });
      }

      return dispatch({
        type: constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_SUCCESS,
        payload: {
          success: translate('message.success')
        }
      });

    });
  },
};


export let submit = form => {
  return dispatch => {

    if (!form.password_new || !form.password_old || !form.confirm) {
      return dispatch({
        type: constants.USERS_SETTINGS_PASSWORD_FORM_ERROR,
        payload: {
          error: translate('error.fill_all_field')
        }
      });
    }

    if (form.password_new != form.confirm) {
      return dispatch({
        type: constants.USERS_SETTINGS_PASSWORD_FORM_ERROR,
        payload: {
          error: translate('error.different_pwd')
        }
      });
    }

    const params = {
      'ticket' : localStorage.getItem('ticket'),
      ...form,
    };

    if (form.google_recaptcha_response === '') {
      delete params.google_recaptcha_response;
    }

    dispatch({type: constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM});
    return getData(2, params, 'user.password_change_internal').then( response => {
      if (response.ok) {
        result.submit(response, dispatch);
      } else {
        return response.json().then( json => {
          return dispatch({
            type: constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_ERROR,
            payload: json
          });
        });
      }
    }).catch( error => {
      console.log(error)
    });
  }
};

