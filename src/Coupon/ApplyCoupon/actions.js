import constants from 'base/constants';
import { generateArrayConst } from "base/utils";
import { translate } from "base/settings";
import { fetchApplyCoupon } from "../../api/coupon";
import notification from '@antd/notification';

export const applyCoupon = (params) => {
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.COUPON_ACTIVATE_SEND_FORM),
      response: fetchApplyCoupon(params),
      errorCallback: (dispatch, data) => {
        if (data.code === -32003) return notification.error({ message: translate('coupon.not_found_coupon')});
        if (data.code === -32019) return notification.error({ message: translate('error.41006')});
        if (data.code === -32005) return notification.error({ message: translate('coupon.coupon_was_used')});
        notification.error({ message: translate('coupon.fail_apply_coupon')})
      },
      successCallback: () => notification.success({ message: translate('coupon.coupon_refilled')}),
    }
  };
};