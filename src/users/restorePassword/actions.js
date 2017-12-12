import constants from 'base/constants';
import { getData } from 'base/settings';
import { routerActions, push} from 'react-router-redux'

let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export let updateForm = (field, value) => {
  return {
    type: constants.USERS_RESTORE_PASSWORD_UPDATE_FORM,
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
          type: constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM_ERROR,
          payload: {
            error: 'Wrong user!'
          }
        });
      }
      return dispatch({
        type: constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM_SUCCESS,
        payload: {
          success: 'Success! The message with instructions for restore password was sent to your e-mail.'
        }
      });

    });
  },
  submitChanger: (response, dispatch) => {
    return response.json().then( json => {
      if (json.error) {
        return dispatch({
          type: constants.USERS_RESTORE_PASSWORD_SUBMIT_CHANGER_FORM_ERROR,
          payload: {
            error: 'Failed to change password!'
          }
        });
      }
      dispatch(push('/users'));
      return dispatch({
        type: constants.USERS_RESTORE_PASSWORD_SUBMIT_CHANGER_FORM_SUCCESS,
      });

    });
  },
};


export let submitRequest = form => {
  return dispatch => {

    if (!form.email || !regEmail.test(form.email)) {
      return dispatch({
        type: constants.USERS_RESTORE_PASSWORD_FORM_ERROR,
        payload: {
          error: 'Invalid format login!'
        }
      });
    }


    const params = {
      'login': form.email,
    };

    dispatch({type: constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM});
    return getData(2, params, 'user.password_restore').then( response => {
      if (response.ok) {
        result.submit(response, dispatch);
      } else {
        return response.json().then( json => {
          return dispatch({
            type: constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM_ERROR,
            payload: {
              error: 'Unknown error!'
            }
          });
        });
      }
    }).catch( error => {
      console.log(error)
    });
  }
};



export let submitChanger = (form, code) => {
  return dispatch => {

    if (!form.new || !form.confirm) {
      return dispatch({
        type: constants.USERS_RESTORE_PASSWORD_FORM_ERROR,
        payload: {
          error: 'Fill in all the fields!'
        }
      });
    }

    if (form.new != form.confirm) {
      return dispatch({
        type: constants.USERS_RESTORE_PASSWORD_FORM_ERROR,
        payload: {
          error: 'Passwords do not match!'
        }
      });
    }

    const params = {
      'password': form.new,
      code: code,
      'google_recaptcha_response': form.google_recaptcha_response
    };

    if (params.google_recaptcha_response === '') {
      delete params.google_recaptcha_response;
    }

    dispatch({type: constants.USERS_RESTORE_PASSWORD_SUBMIT_CHANGER_FORM});
    return getData(2, params, 'user.password_change_external').then( response => {
      if (response.ok) {
        result.submitChanger(response, dispatch);
      } else {
        return response.json().then( json => {
          return dispatch({
            type: constants.USERS_RESTORE_PASSWORD_SUBMIT_CHANGER_FORM_ERROR,
            payload: json
          });
        });
      }
    }).catch( error => {
      console.log(error)
    });
  }
};

