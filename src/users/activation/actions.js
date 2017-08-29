import constants from 'base/constants';
import { getData } from 'base/settings';
import { push } from 'react-router-redux'

let result = {
  activation: {
    submit: (response, dispatch) => {
      return response.json().then(json => {
        if (json.error) {
          return dispatch({
            type: constants.USERS_ACTIVATION_FETCH_FORM_ERROR,
            payload: {
              error: 'Error while activated!'
            }
          });
        }

        dispatch({
          type: constants.USERS_ACTIVATION_FETCH_FORM_SUCCESS,
        });

        dispatch(push('/users/login'));

      });
    }
  },
};


export default {
  updateForm: (field, value) => {
    return {
      type: constants.USERS_ACTIVATION_UPDATE_FORM,
      payload: {
        field, value
      }
    }
  },
  submit: form => {
    return dispatch  => {

      let params = Object.assign({}, form);

      if (!params.code) {
        return dispatch({
          type: constants.USERS_ACTIVATION_FORM_ERROR,
          payload: {
            error: 'Fill in the field!'
          }
        });
      }

      dispatch({type: constants.USERS_ACTIVATION_FETCH_FORM});

      return getData(1, params, 'user.activate').then(response => {
        if (response.ok) {
          result.activation.submit(response, dispatch);
        } else {
          return response.json().then(json => {
            return dispatch({
              type: constants.USERS_ACTIVATION_FETCH_FORM_ERROR,
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