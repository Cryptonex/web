import constants from 'base/constants';
import { combineReducers } from 'redux';
import update from 'react-addons-update';


let pagination = (state={page: 0, page_count: 1, max_count: 10}, action) => {
  switch (action.type) {
    case constants.TRANSACTIONS_FETCH_LIST_SUCCESS:
      return Object.assign({}, state, {
        page_count: action.payload.pagination.page_count,
        max_count: action.payload.pagination.max_count,
        total: action.payload.pagination.total,
      });
    case constants.TRANSACTIONS_UPDATE_LIST:
      return update(state, {
        page: {$set: action.payload.page}
      });
    default:
      return state;
  }
};


let list = (state=[], action) => {
  switch (action.type) {
    case constants.TRANSACTIONS_FETCH_LIST_SUCCESS:
      return action.payload.transactions
    default:
      return state;
  }
};

const defaultFilter = {
  start_stamp: '',
  end_stamp: '',
  status: '',
  address: '',
  max_count: 10,
};

let filter = (state=defaultFilter, action) => {
  switch (action.type) {
    case constants.TRANSACTIONS_UPDATE_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

let processing = (state=false, action) => {
  switch (action.type) {
    case constants.TRANSACTIONS_FETCH_LIST:
      return true;
    case constants.TRANSACTIONS_FETCH_LIST_ERROR:
      return false;
    case constants.TRANSACTIONS_FETCH_LIST_SUCCESS:
      return false;
    default:
      return state;
  }
};

const transactions = combineReducers({
  pagination,
  filter,
  processing,
  list
});


export default (state, action) => {
  if (action.type === 'TRANSACTIONS_LEAVE_PAGE') {
    state = undefined
  }
  return transactions(state, action);
};