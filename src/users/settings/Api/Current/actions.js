import constants from 'base/constants';
import {
  fetchCurrentUserAPI,
  fetchUpdateCurrentUserAPI,
  fetchUpdateRuleCurrentUserAPI,
  fetchCreateIpForAPI,
  fetchDeleteIpFromAPI
} from 'api/userApi';
import { generateArrayConst } from "base/utils";
import { regIpAddress } from 'base/settings';
import { alert } from 'elements/alerts/index';


import moment from 'moment';


export const loadCurrentUserAPI = (id) => {
  const data = {
    id: Number(id)
  };

  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.SETTINGS_API_FETCH_CURRENT),
      response: fetchCurrentUserAPI(data),
      handlerData:(data) => {
        data.user_api_ip = data.user_api_ip || [];
        return data;
      }
    },
  };
};

export const updateInfo = (id, params) => {
  const data = {
    id: Number(id),
    is_active: params.is_active,
    expire_at: params.expire_at
  };

  return (dispatch) => {
    dispatch({
      type: 'PROMISE',
      payload: {
        actions: generateArrayConst(constants.SETTINGS_API_FETCH_UPDATE_CURRENT),
        response: fetchUpdateCurrentUserAPI(data),
      }
    });

    dispatch(updateInfoRule(params.user_api_rule))
  }
};

const updateInfoRule = (params) => {
  const data = {
    ...params
  };

  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.SETTINGS_API_FETCH_UPDATE_CURRENT_RULE),
      response: fetchUpdateRuleCurrentUserAPI(data),
    }
  };
};


export const updateProp = (field, value) => {
  return {
    type: constants.SETTINGS_API_UPDATE_CURRENT,
    payload: { field, value },
  };
};

export const updatePropRule = (field, value) => {
  return {
    type: constants.SETTINGS_API_UPDATE_CURRENT_RULE,
    payload: { field, value },
  };
};

export const addIp = (user_api_id, ip) => {
  const data = {
    user_api_id,
    ip
  };
  return (dispatch) => {
    if (!regIpAddress.test(ip)) {
      return alert.warning('Ip is invalid format!', 5);
    }

    dispatch({
      type: 'PROMISE',
      payload: {
        actions: generateArrayConst(constants.SETTINGS_API_ADD_IP),
        response: fetchCreateIpForAPI(data),
        successCallback: (dispatch) => {
          dispatch(loadCurrentUserAPI(user_api_id))
        }
      }
    });

  };
};

export const deleteIp = (id, user_api_id) => {
  const data = {
    id, user_api_id
  };

  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.SETTINGS_API_DELETE_IP),
      response: fetchDeleteIpFromAPI(data),
      successCallback: (dispatch) => {
        dispatch(loadCurrentUserAPI(user_api_id))
      }
    }
  };
};
