import { getData } from "base/settings";

export const fetchCreateUserAPI = (params) => {
  const data = {
    ...params,
    ticket: localStorage.getItem('ticket')
  };

  return getData(1, data, 'user_api.create');
};

export const fetchListUserAPI = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
  };

  return getData(1, data, 'user_api.list');
};

export const fetchCurrentUserAPI = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
    ...params,
  };

  return getData(1, data, 'user_api.info');
};

export const fetchUpdateCurrentUserAPI = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
    ...params,
  };

  return getData(1, data, 'user_api.update');
};

export const fetchUpdateRuleCurrentUserAPI = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
    ...params,
  };

  return getData(1, data, 'user_api_rule.update');
};

export const fetchCreateIpForAPI = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
    ...params,
  };

  return getData(1, data, 'user_api_ip.create');
};

export const fetchDeleteIpFromAPI = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
    ...params,
  };

  return getData(1, data, 'user_api_ip.delete');
};

export const fetchRefInfo = (params) => {
  const data = {
    ticket: localStorage.getItem('ticket'),
    ...params,
  };

  return getData(1, data, 'user.referer_info');
};

