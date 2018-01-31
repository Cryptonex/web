import constants from 'base/constants';
import update from 'react-addons-update';
import { combineReducers } from 'redux';

const defaultForm = {
  amount: '',
  from_currency: 'btc',
  to_currency: 'cnx',
  to_amount: '',
  auth_2fa_code: ''
};

const form = (state=defaultForm, action) => {
  switch (action.type) {
    case constants.EXCHANGE_UPDATE_FORM:
      return update(state, {
        [action.payload.field]: { $set: action.payload.value }
      });
    case constants.EXCHANGE_UPDATE_INPUTS:
      return update(state, {
        amount: { $set: String(action.payload.amount) },
        to_amount: { $set: action.payload.to_amount },
      });
    case constants.EXCHANGE_UPDATE_SELECTS:
      return update(state, {
        from_currency: { $set: String(action.payload.from_currency) },
        to_currency: { $set: action.payload.to_currency },
      });
    default:
      return state;
  }
};

let processing = (state=false, action) => {
  switch (action.type) {
    case constants.EXCHANGE_FETCH_FORM:
      return true;
    case constants.EXCHANGE_FETCH_FORM_ERROR:
      return false;
    case constants.EXCHANGE_FETCH_FORM_SUCCESS:
      return false;
    default:
      return state;
  }
};

const defaultChart = {
  data: [],
  processing: true,
};

const charts = (state=defaultChart, action) => {
  switch (action.type) {
    case constants.EXCHANGE_FETCH_CHART_DATA:
      return update(state, {
        processing: { $set: true }
      });
    case constants.EXCHANGE_FETCH_CHART_DATA_SUCCESS:
      return update(state, {
        processing: { $set: false },
        data: { $set: action.payload.data }
      });
    case constants.EXCHANGE_FETCH_CHART_DATA_ERROR:
      return update(state, {
        processing: { $set: false }
      });
    default:
      return state;
  }
};


export default combineReducers({
  form,
  processing,
  charts
});
