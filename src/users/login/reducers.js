import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';

let loginForm = (state={login:'', password:'', google_recaptcha_response: ''}, action) => {
  switch (action.type) {
    case constants.USERS_LOGIN_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case constants.USERS_LOGIN_FETCH_FORM:
      return update(state, {
        google_recaptcha_response: {$set: ''}
      });
    case constants.USERS_LOGIN_FETCH_FORM_SUCCESS:
      return {login:'', password:'', google_recaptcha_response: ''};
    default:
      return state;
  }
};

let content = (state='login', action) => {
  switch (action.type) {
    case constants.USERS_LOGIN_CONTENT_AUTHENTICATION:
      return 'auth';
    case constants.USERS_AUTH_CANCEL:
      return 'login';
    default:
      return state;
  }
};

let error = (state='', action) => {
  switch (action.type) {
    case constants.USERS_AUTH_FETCH_FORM:
      return '';
    case constants.USERS_LOGIN_FORM_ERROR:
      return action.payload.error;
    case constants.USERS_LOGIN_FETCH_FORM_ERROR:
      return action.payload.error;
    case constants.USERS_AUTH_FORM_ERROR:
      return action.payload.error;
    case constants.USERS_AUTH_FETCH_FORM_ERROR:
      return action.payload.error;
    case constants.USERS_AUTH_CANCEL:
      return '';
    case constants.USERS_AUTH_UPDATE_FORM:
      return '';
    case constants.USERS_AUTH_FETCH_FORM_SUCCESS:
      return '';
    case constants.USERS_LOGIN_UPDATE_FORM:
      return '';
    case constants.USERS_LOGIN_FETCH_FORM_SUCCESS:
      return '';
    default:
      return state;
  }
};

let authForm = (state={code: '', login: '', password: ''}, action) => {
  switch (action.type) {
    case constants.USERS_AUTH_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case constants.USERS_LOGIN_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case constants.USERS_AUTH_CANCEL:
      return {code: ''};
    default:
      return state;
  }
};


let processing = (state=false, action) => {
  switch (action.type) {
    case constants.USERS_AUTH_FORM_ERROR:
      return false;
    case constants.USERS_LOGIN_FETCH_FORM:
      return true;
    case constants.USERS_LOGIN_FETCH_FORM_ERROR:
      return false;
    case constants.USERS_LOGIN_FETCH_FORM_SUCCESS:
      return false;
    case constants.USERS_AUTH_FETCH_FORM:
      return true;
    case constants.USERS_AUTH_FETCH_FORM_ERROR:
      return false;
    case constants.USERS_AUTH_FETCH_FORM_SUCCESS:
      return false;
    case constants.USERS_LOGIN_CONTENT_AUTHENTICATION:
      return false;
    default:
      return state;
  }
};

const statusRecaptcha = (state=false, action) => {
  switch (action.type) {
    case constants.USERS_LOGIN_FETCH_FORM_ERROR:
      return true;
    default:
      return state
  }
};


let login =  combineReducers({
  loginForm,
  content,
  error,
  authForm,
  processing,
  statusRecaptcha
});


export default (state, action) => {

  if (action.type === constants.USERS_LOGIN_LEAVE_PAGE) {
    state = undefined;
  }

  return login(state, action);
};
