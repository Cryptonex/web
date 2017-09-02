import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';


let form = (state={amount:'', from_hash:'', to_hash: ''}, action) => {
  switch (action.type) {
    case constants.WITHDRAW_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case constants.USERS_PROFILE_FETCH_LIST_WALLET_SUCCESS:
      return update(state, {
        ['from_hash']: {$set: action.payload.cnx.hash}
      });
    default:
      return state;
  }
};

let processing = (state=false, action) => {
  switch (action.type) {
    case constants.WITHDRAW_FETCH_FORM:
      return true;
    case constants.WITHDRAW_FETCH_FORM_ERROR:
      return false;
    case constants.WITHDRAW_FETCH_FORM_SUCCESS:
      return false;
    default:
      return state;
  }
};

let error = (state='', action) => {
  switch (action.type) {
    case constants.WITHDRAW_FORM_ERROR:
      return action.payload.error;
    case constants.WITHDRAW_FETCH_FORM_ERROR:
      return action.payload.error;
    case constants.WITHDRAW_UPDATE_FORM:
      return '';
    case constants.WITHDRAW_FETCH_FORM_SUCCESS:
      return 'Success!';
    default:
      return state;
  }
};



let withdraw = combineReducers({
  form,
  processing,
  error
});

export default (state, action) => {
  if (action.type === constants.WITHDRAW_LEAVE_PAGE) {
    state = undefined
  }
  return withdraw(state, action);
}