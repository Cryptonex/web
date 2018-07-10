import constants from 'base/constants';

import { generateArrayConst } from "base/utils";
import { translate } from "base/settings";
import { fetchDepositMining } from "../../api/mining";
import notification from '@antd/notification';


export const applyDeposit = (params) => {
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.MINING_DEPOSIT),
      response: fetchDepositMining(params),
      errorCallback: (dispatch, data) => {
        if (data.code === -32010) {
          return notification.error({ message: translate('error.41006')});
        }

        notification.error({ message: translate('mining.fail_deposit_contribution')});
      },
      successCallback: (dispatch, data) => {
        notification.success({ message: translate('mining.success_deposit_contribution')});
        dispatch({ type: constants.MINING_DEPOSIT_CLOSE_MODAL })
      }
    }
  };
};