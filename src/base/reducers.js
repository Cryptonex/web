import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';


import users from 'users/reducers';
import transactions from 'transactions/reducers';

export default combineReducers({
  router: routerReducer,
  users,
  transactions
})