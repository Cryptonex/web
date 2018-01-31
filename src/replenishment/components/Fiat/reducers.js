import constants from 'base/constants';
import { combineReducers } from 'redux';
import update from 'react-addons-update';

const initForm = {
  payment_system: '',
  amount: ''
};

const form = (state=initForm, action) => {
  switch (action.type) {
    case constants.FIAT_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: { $set: action.payload.value }
      });
    case constants.FIAT_LEAVE_PAGE:
      return initForm;
    default:
      return state;
  }
};

const payment = (state={list: [], processing: true}, action) => {
  switch (action.type) {
    case constants.FIAT_FETCH_PAYMENTSYSTEM_LIST_ERROR:
      return update(state, {
        processing: { $set: false }
      });
    case constants.FIAT_FETCH_PAYMENTSYSTEM_LIST_SUCCESS:
      return update(state, {
        list: { $set: action.payload.payment_systems },
        processing: { $set: false },
      });
    default:
      return state;
  }
};

const error = (state='', action) => {
  switch (action.type) {
    case constants.FIAT_ERROR_FORM:
      return action.payload.error;
    case constants.FIAT_UPDATE_FORM:
      return '';
    case constants.FIAT_FETCH_PAYMENTSYSTEM_LIST:
      return '';
    case constants.FIAT_LEAVE_PAGE:
      return '';
    default:
      return state;
  }
};

const processing = (state=false, action) => {
  switch (action.type) {
    case constants.FIAT_FETCH_REQUEST_FIAT:
      return true;
    case constants.FIAT_FETCH_REQUEST_FIAT_ERROR:
      return false;
    case constants.FIAT_FETCH_REQUEST_FIAT_SUCCESS:
      return false;
    case constants.FIAT_LEAVE_PAGE:
      return false;
    default:
      return state;
  }
};

const order = (state={id: '', currency: ''}, action) => {
  switch (action.type) {
    case constants.FIAT_FETCH_REQUEST_FIAT_SUCCESS:
      return action.payload;
    case constants.FIAT_LEAVE_PAGE:
      return {id: '', currency: ''};
    default:
      return state;
  }
};

export default combineReducers({
  form,
  payment,
  error,
  processing,
  order
});
