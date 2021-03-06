import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';
import { i18nReducer } from 'react-redux-i18n';

import users from 'users/reducers';
import transactions from 'transactions/reducers';
import withdraw from 'withdraw/reducers';
import referral from 'PrivateRef/reducers';
import activations from 'activations/reducers';
import convert from 'convert/reducers';
import alerts from 'elements/alerts/reducers';
import replenishment from 'replenishment/reducers';
import exchange from 'exchange/reducers';



export default combineReducers({
  router: routerReducer,
  users,
  transactions,
  withdraw,
  referral,
  activations,
  convert,
  alerts,
  replenishment,
  exchange,
  i18n: i18nReducer,
});
