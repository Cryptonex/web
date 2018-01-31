import constants from 'base/constants';
import {getData} from 'base/settings';



let result = {
  getQrcodeUrl: (response, dispatch) => {
    return response.json().then( json => {
      if (json.error) {
        return dispatch({
          type: constants.USERS_SETTINGS_QRCODE_GET_URL_ERROR,
          payload: {
            error: 'Unknown error, reload page!'
          }
        });
      }

      let url = `otpauth://totp/cryptonex.org?secret=${json.result.secret}`;

      return dispatch({
        type: constants.USERS_SETTINGS_QRCODE_GET_URL_SUCCESS,
        payload: {
          url: url
        }
      });

    });
  },
  setEnable2fa: (response, dispatch) => {
    return response.json().then( json => {
      if (json.error) {
        return dispatch({
          type: constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA_ERROR,
          payload: {
            error: 'Unknown error, reload page!'
          }
        });
      }

      return dispatch({
        type: constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA_SUCCESS,
        payload: {
          status: json.result.enable
        }
      });

    });
  },
};




export let updateForm = (field, value) => {

  return {
    type: constants.USERS_SETTINGS_QRCODE_UPDATE_FORM,
    payload: {
      field, value
    }
  }

};


export let getQrcodeUrl = () => {
  return dispatch => {

    const params = {
      'ticket' : localStorage.getItem('ticket')
    };

    dispatch({type: constants.USERS_SETTINGS_QRCODE_GET_URL});
    return getData(2, params, 'user.auth_2fa_get_secret').then( response => {
      if (response.ok) {
        result.getQrcodeUrl(response, dispatch);
      } else {
        return response.json().then( json => {
          return dispatch({
            type: constants.USERS_SETTINGS_QRCODE_GET_URL_ERROR,
            payload: json
          });
        });
      }
    }).catch( error => {
      dispatch({type: constants.USERS_SETTINGS_QRCODE_GET_URL_ERROR});
    });
  }
};

export let setEnable2fa = (form, status) => {
  return dispatch => {

    const params = {
      'ticket': localStorage.getItem('ticket'),
      'enable': status,
      'code': form.code
    };

    if (!Number(params.code) || params.code.length < 6) {
      return dispatch({
        type: constants.USERS_SETTINGS_QRCODE_ERROR_FORM,
        payload: {
          error: "Invalid format code!"
        }
      })
    }

    params.code = Number(params.code);

    dispatch({type: constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA});
    return getData(2, params, 'user.auth_2fa_set').then( response => {
      if (response.ok) {
        result.setEnable2fa(response, dispatch);
      } else {
        return response.json().then( json => {
          return dispatch({
            type: constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA_ERROR,
            payload: json
          });
        });
      }
    }).catch( error => {
      dispatch({type: constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA_ERROR});
    });
  }
};
