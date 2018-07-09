import constants from 'base/constants';
import { generateArrayConst } from "base/utils";
import { translate } from "base/settings";
import { fetchListMining } from "../../api/mining";
import notification from '@antd/notification';

export const loadListMining = (params, max_count) => {
  const page = params.page - 1 || 0;
  const offset = page * max_count;

  let data = {
    max_count,
  };

  if (offset) {
    data.offset = offset;
  }

  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.MINING_LIST),
      response: fetchListMining(data),
      handlerData: (data) => {
        const page_count = Math.ceil(data.summary.total / max_count);
        return {
          list: data.minings,
          page_count
        };
      }
    }
  };
};

