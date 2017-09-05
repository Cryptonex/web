import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';


let form = (state={old: '', new: '', confirm: ''}, action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_PASSWORD_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case  constants.USERS_SETTINGS_PASSWORD_SUBMIT_FORM_SUCCESS:
      return {old: '', new: '', confirm: ''};
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


export default combineReducers({
  form, error, processing
});