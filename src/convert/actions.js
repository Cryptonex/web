import constants from 'base/constants';
import { getData, isNumeric } from 'base/settings';
import { getWallets } from 'users/profile/actions'

export const updateForm = (field, value, rate) => {
  return (dispatch) => {
    if (isNumeric(value) || value === '') {
      const toValue = rate * value;
      dispatch({
        type: constants.CONVERT_UPDATE_FORM,
        payload: {
          field,
          value,
          toValue
        }
      });
    }
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
      alert('Error!');
      return dispatch({
        type: constants.CONVERT_FETCH_FORM_ERROR,
      });
    }
    alert('Success!');
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
      alert("Amount is empty!");
      return;
    }

    if (form.amount > fromWallet.balance) {
      alert("It is possible that you don't have enough money for transactions in the account.");
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
