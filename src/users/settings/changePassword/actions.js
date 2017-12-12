import constants from 'base/constants';
import { getData } from 'base/settings';

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
            error: 'Failed to change password!'
          }
        });
      }

      return dispatch({
        type: constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_SUCCESS,
        payload: {
          success: 'Success!'
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
          error: 'Fill in all the fields!'
        }
      });
    }

    if (form.password_new != form.confirm) {
      return dispatch({
        type: constants.USERS_SETTINGS_PASSWORD_FORM_ERROR,
        payload: {
          error: 'Passwords do not match!'
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

