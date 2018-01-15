import constants from 'base/constants';
import { combineReducers } from 'redux';
import update from 'react-addons-update';

const info = (state={}, action) => {
  switch (action.type) {
    case constants.SETTINGS_API_FETCH_CURRENT_SUCCESS:
      return action.payload;
    case constants.SETTINGS_API_UPDATE_CURRENT:
      return update(state, {
        [action.payload.field]: { $set: action.payload.value }
      });
    case constants.SETTINGS_API_UPDATE_CURRENT_RULE:
      return update(state, {
        user_api_rule: {
          [action.payload.field]: { $set: action.payload.value }
        }
      });
    default:
      return state
  }
};

const status = (state='', action) => {
  switch (action.type) {
    case constants.SETTINGS_API_FETCH_CURRENT:
      return '';
    case constants.SETTINGS_API_FETCH_CURRENT_ERROR:
      return 'error';
    default:
      return state;
  }
};

const processing = (state=true, action) => {
  switch (action.type) {
    case constants.SETTINGS_API_FETCH_CURRENT:
      return true;
    case constants.SETTINGS_API_FETCH_CURRENT_ERROR:
      return false;
    case constants.SETTINGS_API_FETCH_CURRENT_SUCCESS:
      return false;
    case constants.SETTINGS_API_FETCH_UPDATE_CURRENT:
      return true;
    case constants.SETTINGS_API_FETCH_UPDATE_CURRENT_ERROR:
      return false;
    case constants.SETTINGS_API_FETCH_UPDATE_CURRENT_SUCCESS:
      return false;
    default:
      return state;
  }
};

const ip = (state="", action) => {

};

export default combineReducers({
  info,
  status,
  processing
})
