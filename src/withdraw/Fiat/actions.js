import {generateArrayConst} from "../../base/utils";
import { fetchWithdrawFiatAccount } from "../../api/accountApi";
import constants from "../../base/constants";
import notification from '@antd/notification';
import { translate } from "../../base/utils";

export const withdrawFiat = (data) => {
  let params = { ...data };
  for (let key in params) {
    if (params[key] === '') {
      delete params[key];
    }
  }

  params.auth_2fa_code = Number(params.auth_2fa_code);

  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.WITHDRAW_FIAT_FETCH_WITHDRAW),
      response: fetchWithdrawFiatAccount(params),
      successCallback: (dispatch, data) => {
        notification.success({message: translate('message.success')})
      },
      errorCallback: (dispatch, data) => {
        if (data.code === -32003) {
          return notification.error({ message: translate('error.32707')});
        }

        if (data.code === -32009) {
          return notification.error({ message: translate('error.41006')});
        }

        if (data.code === -32015) {
          return notification.error({ message: `${translate('error.41009')}. ${translate('error.order_create.-33004')}`});
        }

        return notification.error({ message: `${translate('error.41009')}. ${translate('error.order_create.-33004')}`});
      }
    },
  };
};