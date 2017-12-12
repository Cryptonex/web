import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';


let form = (state={password_old: '', password_new: '', confirm: '', google_recaptcha_response: ''}, action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_PASSWORD_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case  constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM:
      return update(state, {
        google_recaptcha_response: {$set: ''}
      });
    case  constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_SUCCESS:
      return {password_old: '', password_new: '', confirm: '', google_recaptcha_response: ''};
    default:
      return state;
  }
};

let error = (state='', action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_PASSWORD_UPDATE_FORM:
      return '';
    case constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_ERROR:
      return action.payload.error;
    case constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_SUCCESS:
      return '';
    case constants.USERS_SETTINGS_PASSWORD_FORM_ERROR:
      return action.payload.error;
    default:
      return state;
  }
};

let success = (state='', action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_SUCCESS:
      return action.payload.success;
    case constants.USERS_SETTINGS_PASSWORD_UPDATE_FORM:
      return '';
    default:
      return state;
  }
};

let processing = (state=false, action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM:
      return true;
    case constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_ERROR:
      return false;
    case constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_SUCCESS:
      return false;
    default:
      return state;
  }
};

const statusRecaptcha = (state=false, action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_ERROR:
      return true;
    default:
      return state
  }
};


export default combineReducers({
  form, error, processing, success, statusRecaptcha
});
