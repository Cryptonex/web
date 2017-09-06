import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';


let form = (state={email: '', new: '', confirm: ''}, action) => {
  switch (action.type) {
    case constants.USERS_RESTORE_PASSWORD_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case  constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM_SUCCESS:
      return {email: '', new: '', confirm: ''};
    default:
      return state;
  }
};

let error = (state='', action) => {
  switch (action.type) {
    case constants.USERS_RESTORE_PASSWORD_UPDATE_FORM:
      return '';
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM:
      return '';
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM_ERROR:
      return action.payload.error;
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_CHANGER_FORM_ERROR:
      return action.payload.error;
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM_SUCCESS:
      return '';
    case constants.USERS_RESTORE_PASSWORD_FORM_ERROR:
      return action.payload.error;
    default:
      return state;
  }
};

let success = (state='', action) => {
  switch (action.type) {
    case constants.USERS_RESTORE_PASSWORD_UPDATE_FORM:
      return '';
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM_SUCCESS:
      return action.payload.success;
    default:
      return state;
  }
};


let processing = (state=false, action) => {
  switch (action.type) {
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM:
      return true;
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_CHANGER_FORM:
      return true;
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_CHANGER_FORM_ERROR:
      return false;
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_CHANGER_FORM_SUCCESS:
      return false;
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM_ERROR:
      return false;
    case constants.USERS_RESTORE_PASSWORD_SUBMIT_REQUEST_FORM_SUCCESS:
      return false;
    default:
      return state;
  }
};


let restore =  combineReducers({
  form, error, processing, success
});

export default (state, action) => {

  if (action.type === constants.USERS_RESTORE_PASSWORD_LEAVE_PAGE) {
    state = undefined
  }

  return restore(state, action);
};
