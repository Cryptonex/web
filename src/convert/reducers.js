import constants from 'base/constants';
import update from 'react-addons-update';
import { combineReducers } from 'redux';


const defaultForm = {
  amount:'',
  from_hash:'',
  to_hash: '',
  auth_2fa_code: '',
  to_amount: ''
};

const form = (state=defaultForm, action) => {
  switch (action.type) {
    case constants.CONVERT_UPDATE_FORM:
      if (action.payload.to_hash) {
        return update(state, {
          [action.payload.field]: { $set: action.payload.value },
          to_hash: {$set: action.payload.to_hash || state.to_hash }
        });
      }
      return update(state, {
        [action.payload.field]: { $set: action.payload.value },
      });
    case constants.INIT_CONVERT:
      return update(defaultForm, {
        from_hash: { $set: action.payload.wallets.filter(item => item.currency === 'cnx')[0].hash },
        to_hash: { $set: action.payload.wallets.filter(item => item.currency === 'btc')[0].hash }
      });
    case constants.CONVERT_UPDATE_INPUTS_2A:
      return update(state, {
        auth_2fa_code: { $set: action.payload.value }
      })
    case constants.CONVERT_UPDATE_INPUTS:
      return update(state, {
        amount: { $set: String(action.payload.amount) },
        to_amount: { $set: action.payload.to_amount },
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
  processing
});


