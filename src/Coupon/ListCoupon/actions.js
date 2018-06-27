import constants from 'base/constants';
import { generateArrayConst } from "base/utils";
import { translate } from "base/settings";
import { fetchListCoupon } from "../../api/coupon";
import notification from '@antd/notification';

export const listCoupon = (params, max_count) => {
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
      actions: generateArrayConst(constants.FETCH_LIST_COUPON),
      response: fetchListCoupon(data),
      handlerData: (data) => {
        const page_count = Math.ceil(data.summary.total / max_count);
        return {
          list: data.coupons,
          page_count
        };
      }
    }
  };
};

