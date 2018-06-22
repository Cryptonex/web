import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';


const defaultForm = {
  amount:'',
  email:'',
  note: '',
  payment_system: '',
  currency: 'usd',
  auth_2fa_code: ''
};

let form = (state=defaultForm , action) => {
  switch (action.type) {
    case constants.WITHDRAW_FIAT_UPDATE_FORM:
      if (action.payload.field === 'payment_system') {
        return update(state, {
          email: { $set: '' },
          [action.payload.field]: {$set: action.payload.value}
        });
      }

      if (action.payload.field === 'currency') {
        return update(state, {
          payment_system: { $set: '' },
          [action.payload.field]: {$set: action.payload.value}
        });
      }

      return update(state, {
        [action.payload.field]: {$set: action.payload.value}
      });
    case constants.WITHDRAW_FIAT_FETCH_WITHDRAW_SUCCESS:
      return defaultForm;
    default:
      return state;
  }
};

let processing = (state=false, action) => {
  switch (action.type) {
    case constants.WITHDRAW_FIAT_FETCH_WITHDRAW:
      return true;
    case constants.WITHDRAW_FIAT_FETCH_WITHDRAW_ERROR:
      return false;
    case constants.WITHDRAW_FIAT_FETCH_WITHDRAW_SUCCESS:
      return false;
    default:
      return state;
  }
};

const successWithdraw = (state=false, action) => {
  switch (action.type) {
    case constants.WITHDRAW_FIAT_FETCH_WITHDRAW_SUCCESS:
      return true;
    case constants.WITHDRAW_FIAT_FETCH_WITHDRAW:
      return false;
    default:
      return state;
  }
};


export default combineReducers({
  form, processing, successWithdraw
});