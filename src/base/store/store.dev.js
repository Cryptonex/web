import { createStore, applyMiddleware} from 'redux';
import { routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import history from 'base/history';
import reducers from '../reducers';


export default (initialState) => {
  const store = createStore(
    reducers,
    applyMiddleware(thunk, routerMiddleware(history))
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