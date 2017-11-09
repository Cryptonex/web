import constants from 'base/constants';
import update from 'react-addons-update';
import { combineReducers } from 'redux';


const defaultForm = {
  amount:'',
  from_hash:'',
  to_hash: '',
  auth_2fa_code: ''
};

const form = (state=defaultForm, action) => {
  switch (action.type) {
    case constants.CONVERT_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: { $set: action.payload.value }
      });
    case constants.INIT_CONVERT:
      return update(defaultForm, {
        from_hash: {$set: action.payload.wallets[0].hash},
        to_hash: {$set: action.payload.wallets[1].hash}
      });
    case constants.CONVERT_UPDATE_RATES:
      return update(state, {
        [`${action.payload.field}_hash`]: { $set: action.payload.wallet.hash }
      });
    default:
      return state;
  }
};

const currentWallets = (state={from: null, to: null}, action) => {
  switch (action.type) {
    case constants.INIT_CONVERT:
      return update(state, {
        from: { $set: action.payload.wallets[0] },
        to: { $set: action.payload.wallets[1] }
      });
    case constants.CONVERT_UPDATE_RATES:
      return update(state, {
        [action.payload.field]: { $set: action.payload.wallet }
      });
    default:
      return state;
  }
};

let processing = (state=false, action) => {
  switch (action.type) {
    case constants.CONVERT_FETCH_FORM:
      return true;
    case constants.CONVERT_FETCH_FORM_ERROR:
      return false;
    case constants.CONVERT_FETCH_FORM_SUCCESS:
      return false;
    default:
      return state;
  }
};


export default combineReducers({
  form,
  currentWallets,
  processing
});


