import { createStore, applyMiddleware} from 'redux';
import { routerReducer, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import history from 'base/history';
import reducers from './reducers';

export default createStore(
  reducers,
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(history))
);