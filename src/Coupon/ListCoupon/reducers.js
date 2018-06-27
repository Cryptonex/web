import { combineReducers } from 'redux';
import update from 'immutability-helper';

import constants from 'base/constants';
import { checkChangeUrl } from "base/utils";

const PATH = '/app/coupon/list';

const processing= (state=false, action) => {
  if (checkChangeUrl(action, PATH)) {
    return false;
  }

  switch (action.type) {
    case constants.FETCH_LIST_COUPON:
      return true;
    case constants.FETCH_LIST_COUPON_ERROR:
      return false;
    case constants.FETCH_LIST_COUPON_SUCCESS:
      return false;
    default:
      return state;
  }
};

const list = (state=[], action) => {
  switch (action.type) {
    case constants.FETCH_LIST_COUPON_SUCCESS:
      return action.payload.list;
    default:
      return state;
  } 
};

const defaultPagination = { count: 15, page_count: 0 };

const pagination = (state=defaultPagination, action) => {
  switch (action.type) {
    case constants.FETCH_LIST_COUPON_SUCCESS:
      return update(state, {
        page_count: { $set: action.payload.page_count }
      });
    default:
      return state;
  }
};

export default combineReducers({
  list,
  processing,
  pagination
});