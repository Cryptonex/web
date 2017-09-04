import constants from 'base/constants';
import sha256 from 'sha256';
import { getData } from 'base/settings';
import * as actionsProfile from 'users/profile/actions'

let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let result = {
  login: {
    submit: (response, dispatch) => {
      return response.json().then(json => {
        if (json.error) {
          return dispatch({
            type: constants.USERS_LOGIN_FETCH_FORM_ERROR,
            payload: {
              error: 'Access denied: wrong user or password'
            }
          });
        }

        localStorage.setItem('ticket', json.result.ticket);
        dispatch(actionsProfile.getInfo());
        return dispatch({
          type: constants.USERS_LOGIN_FETCH_FORM_SUCCESS,
        });
      });
    }
  },
  auth: {
    submit: (response, dispatch) => {
      return response.json().then(json => {
        if (json.error) {
          return dispatch({
            type: constants.USERS_AUTH_FETCH_FORM_ERROR,
            payload: {
              error: 'Invalid authentication code!'
            }
          });
        }
        return dispatch({
          type: constants.USERS_LOGIN_FETCH_FORM_SUCCESS,
        });

      });
    }
  }
};


export let login = {
  updateLoginForm: (field, value) => {
    return {
      type: constants.USERS_LOGIN_UPDATE_FORM,
      payload: {
        field, value
      }
    }
  },
  submitLoginForm: form => {
    return dispatch  => {

      let params = Object.assign({}, form);

      if (!params.password || !params.login) {
        return dispatch({
          type: constants.USERS_LOGIN_FORM_ERROR,
          payload: {
            error: 'Fill in all the fields!'
          }
        });
      }

      if (!regEmail.test(params.login)) {
        return dispatch({
          type: constants.USERS_LOGIN_FORM_ERROR,
          payload: {
            error: 'Invalid format Login!'
          }
        })
      }

      params.password = sha256(params.password);
      params.password = sha256(params.password + params.login);

      dispatch({type: constants.USERS_LOGIN_FETCH_FORM});

      return getData(1, params, 'user.login').then(response => {
        if (response.ok) {
          result.login.submit(response, dispatch);
        } else {
          return response.json().then(json => {
            return dispatch({
              type: constants.USERS_LOGIN_FETCH_FORM_ERROR,
              payload: {
                error: 'Unknown error!',
              }
            });
          });
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
};

export let auth = {
  cancel: () => {
    return {type: constants.USERS_AUTH_CANCEL}
  },
  updateAuthForm: (field, value) => {
    return {
      type: constants.USERS_AUTH_UPDATE_FORM,
      payload: {
        field,
        value
      }
    }
  },
  submitAuthForm: form => {
    return dispatch => {
      let params = Object.assign({}, form);

      if(!params.code) {
        return dispatch({
          type: constants.USERS_AUTH_FORM_ERROR,
          payload: {
            error: 'Fill in the field!'
          }
        });
      }

      dispatch({type: constants.USERS_AUTH_FETCH_FORM});

      return getData(1, params, 'user.authenticate').then(response => {
        if (response.ok) {
          result.auth.submit(response, dispatch);
        } else {
          return response.json().then(json => {
            return dispatch({
              type: constants.USERS_AUTH_FETCH_FORM_ERROR,
              payload: {
                error: 'Unknown error!',
              }
            });
          });
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }
};