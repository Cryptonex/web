import constants from 'base/constants';
import { getData } from 'base/settings';




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
      });

    });
  },
};


export let updateForm = (field, value) => {
  return {
    type: constants.USERS_SETTINGS_PASSWORD_UPDATE_FORM,
    payload: {
      field,
      value
    }
  }
};


export let submit = form => {
  return dispatch => {

    if (!form.new || !form.old || !form.confirm) {
      return dispatch({
        type: constants.USERS_SETTINGS_PASSWORD_FORM_ERROR,
        payload: {
          error: 'Fill in all the fields!'
        }
      });
    }

    if (form.new != form.confirm) {
      return dispatch({
        type: constants.USERS_SETTINGS_PASSWORD_FORM_ERROR,
        payload: {
          error: 'Passwords do not match!'
        }
      });
    }

    if (form.new.length < 5) {
      return dispatch({
        type: constants.USERS_SETTINGS_PASSWORD_FORM_ERROR,
        payload: {
          error: 'Set minimum password length value to 5'
        }
      });
    }

    const params = {
      'ticket' : localStorage.getItem('ticket'),
      'password_old': form.old,
      'password_new': form.new,
    };

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

