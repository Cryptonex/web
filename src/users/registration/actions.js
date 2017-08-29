import constants from 'base/constants';
import sha256 from 'sha256';
import { getData } from 'base/settings';
import { push } from 'react-router-redux'

let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let result = {
  registration: {
    submit: (response, dispatch) => {
      return response.json().then(json => {
        if (json.error) {
          return dispatch({
            type: constants.USERS_REGISTRATION_FETCH_FORM_ERROR,
            payload: {
              error: 'Error while registering!'
            }
          });
        }

        dispatch({
          type: constants.USERS_REGISTRATION_FETCH_FORM_SUCCESS,
        });

        dispatch(push('/users/activation'));

      });
    }
  },
};


export default {
  updateForm: (field, value) => {
    return {
      type: constants.USERS_REGISTRATION_UPDATE_FORM,
      payload: {
        field, value
      }
    }
  },
  submit: form => {
    return dispatch  => {

      let params = Object.assign({}, form);

      if (!params.password || !params.email) {
        return dispatch({
          type: constants.USERS_REGISTRATION_FORM_ERROR,
          payload: {
            error: 'Fill in all the fields!'
          }
        });
      }

      if (params.password != params.confirm) {
        return dispatch({
          type: constants.USERS_REGISTRATION_FORM_ERROR,
          payload: {
            error: 'The passwords are different!!'
          }
        });
      }

      if (!regEmail.test(params.email)) {
        return dispatch({
          type: constants.USERS_REGISTRATION_FORM_ERROR,
          payload: {
            error: 'Invalid format Login!'
          }
        })
      }

      for (let key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }


      dispatch({type: constants.USERS_REGISTRATION_FETCH_FORM});

      return getData(1, params, 'user.register').then(response => {
        if (response.ok) {
          result.registration.submit(response, dispatch);
        } else {
          return response.json().then(json => {
            return dispatch({
              type: constants.USERS_REGISTRATION_FETCH_FORM_ERROR,
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
