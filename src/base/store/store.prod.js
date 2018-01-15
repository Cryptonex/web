import { createStore, applyMiddleware} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import history from 'base/history';
import reducers from '../reducers';
import middlewareApi from 'middleware/api';

export default (initialState) => {
  const store = createStore(
    reducers,
    applyMiddleware(middlewareApi),
    applyMiddleware(thunk, routerMiddleware(history)),
  );

  return store;
}
