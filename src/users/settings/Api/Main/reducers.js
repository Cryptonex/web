import constants from 'base/constants';
import { combineReducers } from 'redux';
import update from 'react-addons-update';

const createForm = (state={name: ''}, action) => {
  switch (action.type) {
    case constants.SETTINGS_API_UPDATE_CREATE_FORM:
      return update(state, {
        [action.payload.field]: { $set: action.payload.value }
      });
    default:
      return state;
  }
};

const listKeys = (state=[], action) => {
  switch (action.type) {
    case constants.SETTINGS_API_FETCH_LIST_KEYS_SUCCESS:
      return action.payload.list;
    default:
      return state;
  }
};

export default combineReducers({
  createForm,
  listKeys
})
