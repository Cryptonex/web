import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';


let form = (state={amount:'', address:''}, action) => {
  switch (action.type) {
    case constants.WITHDRAW_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
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
      return '';
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