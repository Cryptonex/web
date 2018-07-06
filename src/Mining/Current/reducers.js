import { combineReducers } from 'redux';
import constants from 'base/constants';
import update from 'react-addons-update';
import { checkChangeUrl } from "base/utils";


const mining = (state={}, action) => {
  if (checkChangeUrl(action)) return {};

  switch (action.type) {
    case constants.MINING_CURRENT_LOAD_INFO_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const loading = (state=true, action) => {
  switch (action.type) {
    case constants.MINING_CURRENT_LOAD_INFO:
      return true;
    case constants.MINING_CURRENT_LOAD_INFO_SUCCESS:
      return false;
    case constants.MINING_CURRENT_LOAD_INFO_ERROR:
      return false;
    default:
      return state;
  }
};

const errorLoadMining = (state=false, action) => {
  if (checkChangeUrl(action)) return false;

  switch (action.type) {
    case constants.MINING_CURRENT_LOAD_INFO_ERROR:
      return true;
    default:
      return state;
  }
};

const defaultPagination = { count: 10, page_count: 0 };

const pagination = (state=defaultPagination, action) => {

  switch (action.type) {
    case constants.MINING_CURRENT_LOAD_TRANSACTION_SUCCESS:
      return update(state, {
        page_count: { $set: action.payload.page_count }
      });
    default:
      return state;
  }
};

const loadingList = (state=true, action) => {

  switch (action.type) {
    case constants.MINING_CURRENT_LOAD_TRANSACTION:
      return true;
    case constants.MINING_CURRENT_LOAD_TRANSACTION_SUCCESS:
      return false;
    case constants.MINING_CURRENT_LOAD_TRANSACTION_ERROR:
      return false;
    default:
      return state;
  }
};

const listTransaction = (state=[], action) => {
  switch (action.type) {
    case constants.MINING_CURRENT_LOAD_TRANSACTION_SUCCESS:
      return action.payload.list;
    default:
      return state;
  }
};

const listChart = (state={list: []}, action) => {
  switch (action.type) {
    case constants.MINING_CURRENT_LOAD_CHART:
      return {list: []};
    case constants.MINING_CURRENT_LOAD_CHART_SUCCESS:
      return action.payload.list;
    default:
      return state;
  }
};

const loadingChartData = (state=false, action) => {

  if (checkChangeUrl(action)) return false;

  switch (action.type) {
    case constants.MINING_CURRENT_LOAD_CHART:
      return true;
    case constants.MINING_CURRENT_LOAD_CHART_SUCCESS:
      return false;
    case constants.MINING_CURRENT_LOAD_CHART_ERROR:
      return false;
    default:
      return state;
  }
};


export default combineReducers({
  mining,
  loadingList,
  listTransaction,
  errorLoadMining,
  pagination,
  loading,
  listChart,
  loadingChartData
});