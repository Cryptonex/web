import { combineReducers } from 'redux';

import transaction from './transaction/reducers';

export default combineReducers({
  transaction,
})