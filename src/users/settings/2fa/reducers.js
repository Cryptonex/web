import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';


let form = (state={code: ''}, action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_QRCODE_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA_SUCCESS:
      return {code: ''};
    default:
      return state;
  }
};

let url = (state='', action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_QRCODE_GET_URL_SUCCESS:
      return action.payload.url;
    default:
      return state;
  }
};

let error = (state='', action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_QRCODE_UPDATE_FORM:
      return '';
    case constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA_ERROR:
      return action.payload.error;
    case constants.USERS_SETTINGS_QRCODE_GET_URL_ERROR:
      return action.payload.error;
    case constants.USERS_SETTINGS_QRCODE_ERROR_FORM:
      return action.payload.error;
    default:
      return state;
  }
};

let processing = (state=false, action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_QRCODE_GET_URL:
      return true;
    case constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA:
      return true;
    case constants.USERS_SETTINGS_QRCODE_GET_URL_ERROR:
      return false;
    case constants.USERS_SETTINGS_QRCODE_GET_URL_SUCCESS:
      return false;
    case constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA_ERROR:
      return false;
    case constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  form, url, error, processing
});
