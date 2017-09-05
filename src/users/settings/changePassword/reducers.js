import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';


let form = (state={old: '', new: '', confirm: ''}, action) => {
  switch (action.type) {
    case constants.USERS_SETTINGS_PASSWORD_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    default:
      return state;
  }
};


export default combineReducers({
  form
});