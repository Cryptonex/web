import { getData } from "base/settings";

export const fetchPaymentSystemList = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
  };

  return getData(1, data, 'payment_system.list');
};

export const fetchRequestFiat = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
    ...params
  };

  return getData(1, data, 'payment_system.order_create');
};


export const fetchListCurrency = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
    ...params
  };

  return getData(1, data, 'currency.list');
};
