import constants from 'base/constants';
import { getData, isNumeric } from 'base/settings';
import { getWallets } from 'users/profile/actions'
import { alert } from 'elements/alerts/index';
import moment from 'moment';

export const updateSelect = (field, value, toWallets, wallets) => {

  const fromCurrentWallet = wallets.filter(item => value === item.hash)[0];

  const toCurrentWallet =  toWallets.filter(item => {
    return (fromCurrentWallet.currency === item.base_currency && item.convert_type ==="cross") ||
      (fromCurrentWallet.currency === item.rel_currency_id && item.convert_type ==="cross")
  });

  const toWallet = wallets.filter((item) => item.hash === value)[0];

  const to_hash = wallets.filter((el, i) => {

    if (value === el.hash) {
      return false;
    }

    const isRel = toCurrentWallet.some(item => {
      return el.currency === item.rel_currency_id || el.currency === item.base_currency
    });

    if (!isRel) {
      return false
    }

    return true;
  })[0].hash;

  return (dispatch) => {
    if (field === 'from_hash') {
      return dispatch({
        type: constants.CONVERT_UPDATE_FORM,
        payload: {
          field,
          value,
          to_hash: to_hash
        }
      });
    }

    dispatch({
      type: constants.CONVERT_UPDATE_FORM,
      payload: {
        field,
        value,
      }
    });
  }
};

export const changeRate = (field, wallet) => {
  return {
    type: constants.CONVERT_UPDATE_RATES,
    payload: {
      field,
      wallet
    }
  }
};


const resultSubmitForm = (response, dispatch) => {
  return response.json().then(json => {
    if (json.error) {
      alert.warning('Error!', 5);
      return dispatch({
        type: constants.CONVERT_FETCH_FORM_ERROR,
      });
    }

    alert.success(`Complete.`, 5);
    dispatch(getWallets());
    return dispatch({
      type: constants.CONVERT_FETCH_FORM_SUCCESS,
    });

  });
};

export const submitForm = (form, wallets) => {
  let data = {
    ticket: localStorage.getItem('ticket'),
    ...form,
  };

  const fromWallet = wallets.filter(wal => wal.hash === form.from_hash)[0];
  if (data.auth_2fa_code === '') {
    delete data.auth_2fa_code;
  }

  data.auth_2fa_code = Number(data.auth_2fa_code);
  console.log(fromWallet)
  return dispatch => {
    if (form.amount === '') {
      alert.warning("Amount is empty!", 5);
      return;
    }

    if (Number(form.amount) > Number(fromWallet.balance)) {
      alert.warning("It is possible that you don't have enough money for transactions in the account.", 5);
      return;
    }

    dispatch({type: constants.CONVERT_FETCH_FORM});
    return getData(1, data, 'currency.convert').then((response) => {
      if (response.ok) {
        resultSubmitForm(response, dispatch);
      } else {
        return response.json().then((json) => {
          return dispatch({
            type: constants.CONVERT_FETCH_FORM_ERROR,
            payload: {
              error: 'Unknown error!',
            }
          });
        });
      }
    }).catch((error) => {
      return dispatch({
        type: constants.CONVERT_FETCH_FORM_ERROR,
        payload: {
          error: 'Unknown error!',
        }
      });
    });
  }
};

export const updateInput = (field, value, form, rate) => {
  return dispatch => {
    if (field === 'auth_2fa_code') {
      return dispatch({
        type: constants.CONVERT_UPDATE_INPUTS_2A,
        payload: {
          field,
          value
        }
      })
    }

    if (field === 'to_amount') {
      return dispatch({
        type: constants.CONVERT_UPDATE_INPUTS,
        payload: {
          to_amount: value,
          amount: value / rate + (value / rate)*0.1 // hard commision
        }
      })
    }

    if (field === 'amount') {
      return dispatch({
        type: constants.CONVERT_UPDATE_INPUTS,
        payload: {
          amount: value,
          to_amount: value * rate - (value * rate) * 0.1
        }
      })
    }

    dispatch({
      type: constants.CONVERT_UPDATE_INPUTS,
      payload: {
        amount: form.amount,
        to_amount: form.amount * rate - (form.amount * rate) * 0.1
      }
    })
  }
};


const resultLoadDataChart = (response, dispatch) => {
  return response.json().then(json => {
    if (json.error) {
      console.log(json)
      alert.warning('Error!', 5);
      return dispatch({
        type: constants.CONVERT_FETCH_CHART_DATA_ERROR,
      });
    }
    const data = json.result.candles.map((item) => {
      return [moment(item.create_at).valueOf(), Number(item.open), Number(item.hight), Number(item.low), Number(item.close)];
    });
    return dispatch({
      type: constants.CONVERT_FETCH_CHART_DATA_SUCCESS,
      payload: {
        data
      }
    });

  });
};

export const loadDataChart = (type, pair) => {
  let data = {
    type,
    start: time(type),
    end: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
    pair,
    ticket: localStorage.getItem('ticket')
  };

  return (dispatch) => {
    dispatch({type: constants.CONVERT_FETCH_CHART_DATA});
    return getData(1, data, 'candle.list').then((response) => {
      if (response.ok) {
        resultLoadDataChart(response, dispatch);
      } else {
        return response.json().then((json) => {
          return dispatch({
            type: constants.CONVERT_FETCH_CHART_DATA_ERROR,
            payload: {
              error: 'Unknown error!',
            }
          });
        });
      }
    }).catch((error) => {
      return dispatch({
        type: constants.CONVERT_FETCH_CHART_DATA_ERROR,
        payload: {
          error: 'Unknown error!',
        }
      });
    });
  }
};

const time = (timeframe) => {

  let time = moment().add(-2,'h').utc().format('YYYY-MM-DD HH:mm:ss');

  if (timeframe === '5min') {
    time = moment().add(-10,'h').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  if (timeframe === '15min') {
    time = moment().add(-24,'h').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  if (timeframe === '1h') {
    time = moment().add(-5,'d').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  if (timeframe === '1d') {
    time = moment().add(-1,'M').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  if (timeframe === '1m') {
    time = moment().add(-1,'y').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  if (timeframe === '1w') {
    time = moment().add(-3,'w').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  return time;
};
