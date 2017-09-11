import constants from 'base/constants';
import { combineReducers } from 'redux';


let error = (state=false, action) => {
  switch (action.type) {
    case constants.ACTIVATIONS_TRANSACTION_FETCH_CODE_ERROR:
      return true;
    default:
      return state;
  }
};


let processing = (state=false, action) => {
  switch (action.type) {
    case constants.ACTIVATIONS_TRANSACTION_FETCH_CODE:
      return true;
    case constants.ACTIVATIONS_TRANSACTION_FETCH_CODE_ERROR:
      return false;
    case constants.ACTIVATIONS_TRANSACTION_FETCH_CODE_SUCCESS:
      return false;
    default:
      return state;
  }
};


let transaction =  combineReducers({
  error,
  processing
});


export default (state, action) => {

  if (action.type === constants.ACTIVATIONS_TRANSACTION_LEAVE_PAGE) {
    state = undefined;
  }

  return transaction(state, action);
};