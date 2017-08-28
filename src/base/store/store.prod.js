import { createStore, applyMiddleware} from 'redux';
import { routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import history from 'base/history';
import reducers from '../reducers';


export default (initialState) => {
  const store = createStore(
    reducers,
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  );

  return store;
}