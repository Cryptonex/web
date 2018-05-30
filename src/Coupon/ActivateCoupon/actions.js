import constants from 'base/constants';
import { generateArrayConst } from "base/utils";
import { translate } from "base/settings";
import { fetchActivateCoupon } from "../../api/coupon";
import notification from '@antd/notification';

export const activateCoupon = (params) => {
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.COUPON_ACTIVATE_SEND_FORM),
      response: fetchActivateCoupon(params),
      errorCallback: (dispatch, data) => {
        if (data.code === -32012) return notification.error({ message: translate('coupon.need_password')});
        notification.error({ message: translate('coupon.activate_coupon_error')})
      },
      successCallback: () => notification.success({ message: translate('coupon.activate_coupon_success')}),
    }
  };
};