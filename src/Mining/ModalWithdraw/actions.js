import constants from 'base/constants';

import { generateArrayConst } from "base/utils";
import { translate } from "base/settings";
import { fetchWithdrawMining } from "../../api/mining";
import notification from '@antd/notification';


export const withdrawDeposit = (params) => {
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.MINING_WITHDRAW),
      response: fetchWithdrawMining(params),
      errorCallback: (dispatch, data) => {
        if (data.code === -32008) {
          return notification.error({ message: translate('error.41006')});
        }

        notification.error({ message: translate('mining.fail_withdraw_contribution')});
      },
      successCallback: (dispatch, data) => {
        notification.success({ message: translate('mining.success_withdraw_contribution')});
        dispatch({ type: constants.MINING_WITHDRAW_CLOSE_MODAL })
      }
    }
  };
};