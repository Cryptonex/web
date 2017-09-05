import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';


import qrcode from './2fa/reducers';
import changePassword from './changePassword/reducers';

const settings = combineReducers({
  qrcode, changePassword
});


export default (state, action) => {

  if (action.type === constants.USERS_SETTINGS_LEAVE_PAGE) {
    state = undefined
  }

  return settings(state, action);
};
