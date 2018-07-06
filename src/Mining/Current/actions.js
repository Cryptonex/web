import constants from 'base/constants';
import { generateArrayConst } from "base/utils";
import { fetchListTransaction, fetchGetInfo } from "api/mining";
import { push } from 'react-router-redux';
import {fetchMiningCreate} from "../../api/mining";
import {translate} from "../../base/settings";
import notification from "antd/lib/notification/index";
import moment from 'moment';

export const loadListTransaction = (params, max_count) => {
  const page = params.page - 1 || 0;
  const offset = page * max_count;

  let data = {
    offset,
    max_count,
    ...params
  };

  if (data.offset === 0) {
    delete data.offset;
  }

  for (let prop in data) {
    if (data[prop] === "") {
      delete data[prop];
    }
  }

  data.mining_id = Number(data.mining_id);

  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.MINING_CURRENT_LOAD_TRANSACTION),
      response: fetchListTransaction(data),
      handlerData: (data) => {
        const page_count = Math.ceil(data.summary.total / max_count);
        return {
          list: data.transactions,
          page_count
        };
      }
    }
  };
};


export const loadDataCharts = (data, max_count) => {
  data["types"] = ["mining_mining","mining_deposit_bonus","mining_deposit_admin","mining_withdrawal","mining_deposit"];
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.MINING_CURRENT_LOAD_CHART),
      response: fetchListTransaction(data),
      handlerData: (data) => {
        const page_count = Math.ceil(data.summary.total / max_count);

        const dataListChart =() => {
          let list = [];
          let withdrawal = [];
          let deposit = [];

          data.transactions.reverse().reduce((accumulator, item, index) => {
            if (index === 0) list.push([moment(item.post_stamp).startOf('minute').valueOf(), Number(item.from_amount)]);
            if (index !== 0) list.push([moment(item.post_stamp).startOf('minute').valueOf(), Number(accumulator)]);
            if (item.type === 'mining_withdrawal') withdrawal.push([moment(item.post_stamp).startOf('minute').valueOf(), Number(accumulator)]);
            if (item.type === 'mining_deposit') deposit.push([moment(item.post_stamp).startOf('minute').valueOf(), Number(accumulator)]);
            return accumulator + Number(item.type === 'mining_withdrawal' ? -item.from_amount: item.from_amount);
          },(Number(0)));

          return { list, withdrawal, deposit};
        };

        return {
          list: dataListChart(),
          page_count
        };
      }
    }
  };
};

export const getData = (params) => {

  let data = { ...params };

  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.MINING_CURRENT_LOAD_INFO),
      response: fetchGetInfo(params),
    }
  };
};