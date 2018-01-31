import constants from 'base/constants';
import update from 'react-addons-update';
import { combineReducers } from 'redux';

let defaultState = {
  is_active: false,
  info: {
    login: '',
    name: '',
    role: '',
    auth_2fa: false,
    client: {},
    actions: {}
  },
  code: 'undefined',
  type: 'phone'
};

let currentState = (localStorage.current) ? JSON.parse(localStorage.current) : defaultState;

let current = function (state = currentState, action) {
  switch (action.type){
    case constants.USERS_PROFILE_FETCH_INFO_SUCCESS:
      return action.payload.profile;
    case constants.USERS_PROFILE_FETCH_INFO_ERROR:
      if (action.payload.code == 'undefined') {
        return defaultState;
      }
      return update(defaultState, {
        'code': {
          $set: action.payload.code
        }
      });
    case constants.USERS_PROFILE_LOGOUT_SUCCESS:
      return defaultState;
    case constants.FETCH_AUTO_CONVERT_SUCCESS:
      return update(state, {
        info: {
          deposit_auto_convert: { $set: !state.info.deposit_auto_convert}
        }
      });
    case constants.USERS_SETTINGS_QRCODE_SET_ENABLE_2FA_SUCCESS:
      console.log(action.payload.status)
      return update(state, {
        'info': {
          auth_2fa: {$set: action.payload.status}
        }
      });
    default:
      return state;
  }
};

let walletCnx = (state = {balance: '', currency: '', hash: ''}, action) => {
  switch (action.type) {
    case constants.USERS_PROFILE_FETCH_LIST_WALLET_SUCCESS:
      return action.payload.cnx;
    case constants.WITHDRAW_FETCH_FORM_SUCCESS:
      return update(state, {
        balance: {$set: action.payload.cnx.balance}
      });
    default:
      return state;
  }
};

const rates = (state=[], action) => {
  switch (action.type) {
    case constants.USERS_PROFILE_FETCH_LIST_RATES_SUCCESS:
      return action.payload.rates;
    default:
      return state;
  }
};


let wallets = (state=[], action) => {
  switch (action.type) {
    case constants.USERS_PROFILE_FETCH_LIST_WALLET_SUCCESS:
      return action.payload.wallets;
    default:
      return state;
  }
};

let processingStartApp = (state={ info: true, wallets: true, rates: true }, action) => {
  switch (action.type) {
    case constants.USERS_PROFILE_FETCH_LIST_RATES_SUCCESS:
      return update(state, {
        rates: { $set: false }
      });
    case constants.USERS_PROFILE_FETCH_LIST_RATES_ERROR:
      return update(state, {
        rates: { $set: false }
      });
    case constants.USERS_PROFILE_FETCH_INFO_SUCCESS:
      return update(state, {
        info: {$set: false}
      });
    case constants.USERS_PROFILE_FETCH_INFO_ERROR:
      return update(state, {
        info: {$set: false}
      });
    case constants.USERS_PROFILE_FETCH_LIST_WALLET_ERROR:
      return update(state, {
        wallets: {$set: false}
      });
    case constants.USERS_PROFILE_FETCH_LIST_WALLET_SUCCESS:
      return update(state, {
        wallets: {$set: false}
      });
    default:
      return state;
  }
};


let currencies = (state=[], action) => {
  switch (action.type) {
    case constants.FETCH_LIST_CURRENCY_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  current,
  processingStartApp,
  wallets,
  walletCnx,
  rates,
  currencies
});
