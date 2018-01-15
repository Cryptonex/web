import constants from 'base/constants';
import { generateArrayConst } from 'base/utils';
import { fetchPaymentSystemList, fetchRequestFiat } from 'api/payment'

export const loadPaymentSystem = () => {
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.FIAT_FETCH_PAYMENTSYSTEM_LIST),
      response: fetchPaymentSystemList(),
    }
  };
};

export const sendRequestFiat = (params, form) => {

  if (Object.values(params).includes('')) {
    return {
      type: constants.FIAT_ERROR_FORM,
      payload: {
        error: 'Fill in all the fields!'
      }
    };
  }

  if (!Number(params.amount)) {
    return {
      type: constants.FIAT_ERROR_FORM,
      payload: {
        error: 'Amount should be numeric!'
      }
    };
  }

  const data = {
    ...params
  };

  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.FIAT_FETCH_REQUEST_FIAT),
      response: fetchRequestFiat(data),
      successCallback: () => {
        setTimeout(() => {
          form.submit();
        }, 0);
      },
      handlerData: (data) => {
        return {
          id: data.order_id,
          currency: data.currency,
        };
      }
    }
  };
};

export const updateForm = (field, value) => {
  return {
    type: constants.FIAT_UPDATE_FORM,
    payload: { field, value }
  };
};
