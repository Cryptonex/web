import { combineReducers } from 'redux';
import update from 'immutability-helper';

import constants from 'base/constants';
import { checkChangeUrl } from "base/utils";

const PATH = '/app/mining';

const processingCreate = (state=false, action) => {
  if (checkChangeUrl(action, PATH)) {
    return false;
  }

  switch (action.type) {
    case constants.MINING_CREATE:
      return true;
    case constants.MINING_CREATE_ERROR:
      return false;
    case constants.MINING_CREATE_SUCCESS:
      return false;
    default:
      return state;
  }
};

const defaultForm = {
  amount: '',
  description: '',
  hold: false,
};

const form = (state=defaultForm, action) => {
  if (checkChangeUrl(action, PATH)) {
    return defaultForm;
  }

  switch (action.type){
    case constants.MINING_CREATE_UPDATE_FORM: {
      const { field, value } = action.payload;
      return update(state, {
        [field]: { $set: value }
      });
    }
    case constants.MINING_CREATE_SUCCESS:
      return defaultForm;
    default:
      return state;
  }
};

const defaultValidate = {
  amount: '',
  description: '',
};

const validateDate = (state=defaultValidate, action) => {
  if (checkChangeUrl(action, PATH)) {
    return defaultValidate;
  }

  switch (action.type){
    case constants.MINING_CREATE_UPDATE_FORM: {
      const { field, value } = action.payload;
      return update(state, {
        [field]: { $set: '' }
      });
    }
    case constants.MINING_CREATE_VALIDATE_FORM:
      return update(state, {
        [action.payload.field]: { $set: action.payload.message }
      });
    case constants.COUPON_CREATE_COUPON:
      return defaultValidate;
    default:
      return state;
  }
};

const miningPool = (state={}, action) => {
  switch (action.type){
    case constants.MINING_CREATE_LOAD_POOL_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default combineReducers({
  form,
  processingCreate,
  validateDate,
  miningPool
});