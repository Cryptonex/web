import constants from 'base/constants';
import { fetchCreateUserAPI, fetchListUserAPI } from 'api/userApi';
import { generateArrayConst } from "base/utils";
import { alert } from 'elements/alerts/index';
import { translate } from "base/utils";

export const createAPIKey = (params) => {
  return (dispatch) => {
    if (params.name === '') {
      alert.warning(translate('error.is_empty', { field: translate('form.title')}), 5);
      return dispatch;
    }

    return dispatch({
      type: 'PROMISE',
      payload: {
        actions: generateArrayConst(constants.SETTINGS_API_FETCH_CREATE),
        response: fetchCreateUserAPI(params),
        successCallback: (dispatch) => {
          dispatch(updateCreateForm('name', ''));
          dispatch(loadUserAPI())
        }
      }
    });
  }



};

export const updateCreateForm = (field, value) => {
  return {
    type: constants.SETTINGS_API_UPDATE_CREATE_FORM,
    payload: { field, value },
  };
};

export const loadUserAPI = () => {
  return {
    type: 'PROMISE',
    payload: {
      actions: generateArrayConst(constants.SETTINGS_API_FETCH_LIST_KEYS),
      response: fetchListUserAPI(),
      handlerData: (data) => {
        return {
          list: data.list.map((item) => {
            item.user_api_ip = item.user_api_ip || [];
            return item;
          }),
        };
      }
    }
  };
};
