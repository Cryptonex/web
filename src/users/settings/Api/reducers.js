import { combineReducers } from 'redux';

import main from './Main/reducers'
import current from './Current/reducers';

export default combineReducers({
  main,
  current
});
