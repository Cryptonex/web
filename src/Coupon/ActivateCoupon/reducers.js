import { combineReducers } from 'redux';
import update from 'immutability-helper';

import constants from 'base/constants';
import { checkChangeUrl } from "base/utils";

const PATH = '/app/coupon/activate';

const processingActivate = (state=false, action) => {
  if (checkChangeUrl(action, PATH)) {
    return false;
  }

  switch (action.type) {
    case constants.COUPON_ACTIVATE_SEND_FORM:
      return true;
    case constants.COUPON_ACTIVATE_SEND_FORM_ERROR:
      return false;
    case constants.COUPON_ACTIVATE_SEND_FORM_SUCCESS:
      return false;
    default:
      return state;
  }
};

const defaultForm = {
  coupon: '',
  password: ''
};

const form = (state=defaultForm, action) => {
  if (checkChangeUrl(action, PATH)) {
    return defaultForm;
  }

  switch (action.type){
    case constants.COUPON_ACTIVATE_UPDATE_FORM: {
      const { field, value } = action.payload;
      return update(state, {
        [field]: { $set: value }
      });
    }
    case constants.COUPON_ACTIVATE_SEND_FORM_SUCCESS:
      return defaultForm;
    default:
      return state;
  }
};

export default combineReducers({
  form,
  processingActivate
});