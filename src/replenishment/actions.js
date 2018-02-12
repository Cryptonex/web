import constants from 'base/constants';
import { getData } from "base/settings";
import { alert } from 'elements/alerts/index';
import { translate } from "../base/utils";

const resultFetchChangeStatusConvert = (response, dispatch) => {
  return response.json().then((json) => {
    if (json.error) {
      alert.warning('Error!', 5);
      return dispatch({
        type: constants.FETCH_AUTO_CONVERT_ERROR,
      });
    }
    alert.success(translate('message.status_change_autoconvert_into_cnx'), 5);
    return dispatch({
      type: constants.FETCH_AUTO_CONVERT_SUCCESS,
    });
  });
};

export let fetchChangeStatusConvert = (status) => {
  return dispatch => {

    let params = {
      status,
      'ticket' : localStorage.getItem('ticket'),
    };

    dispatch({type: constants.FETCH_AUTO_CONVERT});

    return getData(2, params, 'exchange.deposit_auto_convert_set').then( response => {
      if (response.ok) {
        resultFetchChangeStatusConvert(response, dispatch);
      } else {
        return response.json().then( json => {
          return dispatch({
            type: constants.FETCH_AUTO_CONVERT_ERROR,
            payload: json
          });
        });
      }
    }).catch( error => {
      dispatch({type: constants.FETCH_AUTO_CONVERT_ERROR});
    });
  }
};
