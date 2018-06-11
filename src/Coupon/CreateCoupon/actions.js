import constants from 'base/constants';
import { generateArrayConst } from "base/utils";
import { translate } from "base/settings";
import { fetchCreateCoupon } from "../../api/coupon";
import notification from '@antd/notification';

export const createCoupon = (params) => {
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.COUPON_CREATE_COUPON),
      response: fetchCreateCoupon(params),
      successCallback: () => {
        notification.success({ message: translate('coupon.success_create_coupon')})
      },
      errorCallback: (dispatch, data) => {
        if (data.code === -32014)  return notification.error({ message: translate('coupon.error_length_comment')});
        if (data.code === -32015)  return notification.error({ message: translate('error.41006')});
        
        notification.error({ message: translate('coupon.error_create_coupon') });
      }
    }
  };
};