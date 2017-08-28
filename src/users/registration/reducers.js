import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';

let registrationForm = (state={email:'', password:'', confirm:'', code: ''}, action) => {
  switch (action.type) {
    case constants.USERS_REGISTRATION_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case constants.USERS_REGISTRATION_FETCH_FORM_SUCCESS:
      return {email:'', password:'', confirm:'', code: ''};
    default:
      return state;
  }
};



let error = (state='', action) => {
  switch (action.type) {
    case constants.USERS_REGISTRATION_FORM_ERROR:
      return action.payload.error;
    case constants.USERS_REGISTRATION_FETCH_FORM_ERROR:
      return action.payload.error;
    case constants.USERS_REGISTRATION_UPDATE_FORM:
      return '';
    case constants.USERS_REGISTRATION_FETCH_FORM_SUCCESS:
      return '';
    default:
      return state;
  }
};


let processing = (state=false, action) => {
  switch (action.type) {
    case constants.USERS_REGISTRATION_FETCH_FORM:
      return true;
    case constants.USERS_REGISTRATION_FETCH_FORM_ERROR:
      return false;
    case constants.USERS_REGISTRATION_FETCH_FORM_SUCCESS:
      return false;
    default:
      return state;
  }
};


let registration =  combineReducers({
  registrationForm,
  error,
  processing
});

export default (state, action) => {

  if (action.type === constants.USERS_REGISTRATION_LEAVE_PAGE) {
    state = undefined
  }

  return registration(state, action);
};
