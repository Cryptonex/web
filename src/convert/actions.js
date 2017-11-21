import constants from 'base/constants';
import { getData, isNumeric } from 'base/settings';
import { getWallets } from 'users/profile/actions'
import { alert } from 'elements/alerts/index';

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

    alert.success(`Success!`, 5);
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

  return dispatch => {
    if (form.amount === '') {
      alert.warning("Amount is empty!", 5);
      return;
    }

    if (form.amount > fromWallet.balance) {
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
          amount: value / rate
        }
      })
    }

    if (field === 'amount') {
      return dispatch({
        type: constants.CONVERT_UPDATE_INPUTS,
        payload: {
          amount: value,
          to_amount: value * rate
        }
      })
    }

    dispatch({
      type: constants.CONVERT_UPDATE_INPUTS,
      payload: {
        amount: form.amount,
        to_amount: form.amount * rate
      }
    })


  }

};
