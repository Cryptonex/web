import constants from 'base/constants';
import { getData, isNumeric } from 'base/settings';
import { getWallets } from 'users/profile/actions'
import { alert } from 'elements/alerts/index';
import moment from 'moment';

export const updateForm = (field, value) => {
  return {
    type: constants.EXCHANGE_UPDATE_FORM,
    payload: { field, value }
  };
};

const resultSubmitForm = (response, dispatch) => {
  return response.json().then(json => {
    if (json.error) {
      alert.warning('Error!', 5);
      return dispatch({
        type: constants.EXCHANGE_FETCH_FORM_ERROR,
      });
    }

    alert.success(`Complete.`, 5);
    dispatch(getWallets());
    return dispatch({
      type: constants.EXCHANGE_FETCH_FORM_SUCCESS,
    });

  });
};

export const submitForm = (form, wallets) => {
  let data = {
    ticket: localStorage.getItem('ticket'),
    ...form,
  };

  const fromWallet = wallets.filter(wal => form.from_currency === wal.currency)[0];

  if (data.auth_2fa_code === '') {
    delete data.auth_2fa_code;
  }

  data.auth_2fa_code = Number(data.auth_2fa_code);

  return dispatch => {
    if (form.amount === '') {
      alert.warning("Amount is empty!", 5);
      return;
    }

    if (typeof fromWallet === 'undefined' || Number(form.amount) > Number(fromWallet.balance)) {
      alert.warning("It is possible that you don't have enough money for trading transactions in the account.", 5);
      return;
    }

    dispatch({type: constants.EXCHANGE_FETCH_FORM});
    return getData(1, data, 'currency.convert').then((response) => {
      if (response.ok) {
        resultSubmitForm(response, dispatch);
      } else {
        return response.json().then((json) => {
          return dispatch({
            type: constants.EXCHANGE_FETCH_FORM_ERROR,
            payload: {
              error: 'Unknown error!',
            }
          });
        });
      }
    }).catch((error) => {
      return dispatch({
        type: constants.EXCHANGE_FETCH_FORM_ERROR,
        payload: {
          error: 'Unknown error!',
        }
      });
    });
  }
};

const resultLoadDataChart = (response, dispatch) => {
  return response.json().then(json => {
    if (json.error) {
      console.log(json)
      alert.warning('Error!', 5);
      return dispatch({
        type: constants.EXCHANGE_FETCH_CHART_DATA_ERROR,
      });
    }
    const data = json.result.candles.map((item) => {
      return [moment(moment(item.start_at).utc()).add('h', 5).valueOf(), Number(item.open), Number(item.hight), Number(item.low), Number(item.close)];
    });
    return dispatch({
      type: constants.EXCHANGE_FETCH_CHART_DATA_SUCCESS,
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
    dispatch({type: constants.EXCHANGE_FETCH_CHART_DATA});

    return getData(1, data, 'candle.list').then((response) => {
      if (response.ok) {
        resultLoadDataChart(response, dispatch);
      } else {
        return response.json().then((json) => {
          return dispatch({
            type: constants.EXCHANGE_FETCH_CHART_DATA_ERROR,
            payload: {
              error: 'Unknown error!',
            }
          });
        });
      }
    }).catch((error) => {
      return dispatch({
        type: constants.EXCHANGE_FETCH_CHART_DATA_ERROR,
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
    time = moment().add(-2,'d').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  if (timeframe === '1d') {
    time = moment().add(-49,'d').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  if (timeframe === '1m') {
    time = moment().add(-1,'y').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  if (timeframe === '1w') {
    time = moment().add(-1,'y').utc().format('YYYY-MM-DD HH:mm:ss');
  }

  return time;
};
