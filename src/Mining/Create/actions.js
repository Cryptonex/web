import constants from 'base/constants';

import { generateArrayConst } from "base/utils";
import { translate } from "base/settings";
import {fetchMiningCreate, fetchMiningPoolInfo} from "../../api/mining";
import notification from '@antd/notification';


export const createMining = (params) => {

  let data = { ...params };
  data.amount = String(data.amount);
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.MINING_CREATE),
      response: fetchMiningCreate(data),
      errorCallback: (dispatch, data) => {
        if (data.code === -32007) {
          return notification.error({ message: translate('error.41006')})
        }

        notification.error({ message: translate('mining.fail_make_contribution')})
      },
      successCallback: (dispatch, data) => {
        notification.success({message: translate('mining.success_make_contribution') })
      }
    }
  };
};

export const loadMiningPool = () => {
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.MINING_CREATE_LOAD_POOL),
      response: fetchMiningPoolInfo()
    }
  };
};