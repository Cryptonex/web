import constants from 'base/constants';
import update from 'react-addons-update';
import { combineReducers } from 'redux';

let proccesingStatus = function (state=false, action) {
  switch (action.type){
    case constants.FETCH_AUTO_CONVERT:
      return true;
    case constants.FETCH_AUTO_CONVERT_SUCCESS:
      return false;
    case constants.FETCH_AUTO_CONVERT_ERROR:
      return false;
    default:
      return state;
  }
};


export default combineReducers({
  proccesingStatus
});
