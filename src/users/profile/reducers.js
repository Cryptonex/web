import constants from 'base/constants';
import update from 'react-addons-update';
import { combineReducers } from 'redux';

let defaultState = {
  is_active: false,
  info: {
    login: '',
    name: '',
    role: '',
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
}

let wallets = (state=[], action) => {
  switch (action.type) {
    case constants.USERS_PROFILE_FETCH_LIST_WALLET_SUCCESS:
      return action.payload.wallets;
    default:
      return state;
  }
};

let processingStartApp = (state={info: true, wallets: true}, action) => {
  switch (action.type) {
    case constants.USERS_PROFILE_FETCH_INFO_ERROR:
      return update(state, {
        info: {$set: false}
      });
    case constants.USERS_PROFILE_FETCH_INFO_NETWORK_ERROR:
      return update(state, {
        info: {$set: false}
      });
    case constants.USERS_PROFILE_FETCH_INFO_SUCCESS:
      return update(state, {
        info: {$set: false}
      });
    case constants.USERS_PROFILE_FETCH_LIST_WALLET_ERROR:
      return update(state, {
        wallets: {$set: false}
      });
    case constants.USERS_PROFILE_FETCH_LIST_WALLET_NETWORK_ERROR:
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

export default combineReducers({
  current,
  processingStartApp,
  wallets,
  walletCnx
});