import { combineReducers } from 'redux';
import update from 'immutability-helper';

import constants from 'base/constants';
import { checkChangeUrl } from "base/utils";

const PATH = '/app/list';


const processing = (state=false, action) => {
  if (checkChangeUrl(action)) {
    return false;
  }

  switch (action.type) {
    case constants.MINING_WITHDRAW:
      return true;
    case constants.MINING_WITHDRAW_ERROR:
      return false;
    case constants.MINING_WITHDRAW_SUCCESS:
      return false;
    default:
      return state;
  }
};

const showModal = (state=false, action) => {
  if (checkChangeUrl(action)) {
    return false;
  }

  switch (action.type) {
    case constants.MINING_WITHDRAW_SHOW_MODAL:
      return true;
    case constants.MINING_WITHDRAW_CLOSE_MODAL:
      return false;
    default:
      return state;
  }
};

const depositID = (state='', action) => {
  if (checkChangeUrl(action)) {
    return '';
  }

  switch (action.type) {
    case constants.MINING_WITHDRAW_SHOW_MODAL:
      return action.payload.depositID;
    case constants.MINING_WITHDRAW_CLOSE_MODAL:
      return '';
    default:
      return state;
  }
};

const defaultForm = { amount: '' };

const form = (state=defaultForm, action) => {
  switch (action.type) {
    case constants.MINING_WITHDRAW_UPDATE_FORM:
      if (action.payload.value === 'undefined') {
        return update(state, {
          [action.payload.field]: { $set: '' }
        });
      }

      return update(state, {
        [action.payload.field]: { $set: action.payload.value }
      });
    case constants.MINING_WITHDRAW_CLOSE_MODAL:
      return defaultForm;
    case constants.MINING_WITHDRAW_SUCCESS:
      return defaultForm;
    default:
      return state;
  }
};

const defaultValidate = { amount: '' };

const validateDate = (state=defaultValidate, action) => {
  if (checkChangeUrl(action, PATH)) {
    return defaultValidate;
  }

  switch (action.type){
    case constants.MINING_WITHDRAW_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: { $set: '' }
      });
    case constants.MINING_WITHDRAW_VALIDATE_FORM:
      return update(state, {
        [action.payload.field]: { $set: action.payload.message }
      });
    case constants.MINING_WITHDRAW_CLOSE_MODAL:
      return defaultValidate;
    case constants.MINING_WITHDRAW:
      return defaultValidate;
    default:
      return state;
  }
};




export default combineReducers({
  showModal,
  depositID,
  form,
  validateDate,
  processing
});