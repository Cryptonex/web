import { createStore, applyMiddleware} from 'redux';
import { routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import history from 'base/history';
import reducers from '../reducers';
import middlewareApi from 'middleware/api';

export default (initialState) => {
  const store = createStore(
    reducers,
    applyMiddleware(thunk, routerMiddleware(history), middlewareApi)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('base/reducers', () => {
      const nextReducer = require('base/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
