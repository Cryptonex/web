import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import CreateCoupon from './CreateCoupon';
import { updateForm } from "../../main/actions/common";
import constants from 'base/constants';
import { createCoupon } from "./actions";
import { translate } from "../../base/settings";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};
  const updateField = (field, value) => dispatch(updateForm(field, String(value), constants.COUPON_CREATE_UPDATE_FORM));

  const create = () => {
    const { form } = result;
    const data = { ...form };
    if (!form.amount) {
      return dispatch({
        type: 'COUPON_CREATE_VALIDATE_FORM',
        payload: { field: 'amount', message: translate('coupon.field_empty', { field: translate('form.amount') })}
      })
    }

    if (!form.currency) {
      return dispatch({
        type: 'COUPON_CREATE_VALIDATE_FORM',
        payload: { field: 'currency', message: translate('coupon.take_currency')}
      })
    }
    
    for (let prop in data) {
      if (!data[prop]) {
        delete data[prop];
      }
    }
    
    dispatch(createCoupon(data));
  };
  
  return (nextState, nextOwnProps) => {
    const { currencies, wallets } = nextState.users.profile;
    const { createCoupon } = nextState.coupon;
    const walletsCurrency = wallets.map(item => item.currency);
    
    const nextResult = {
      currencies: currencies.filter(item => item.type === 'crypto'),
      create,
      updateField,
      ...createCoupon,
      ...nextOwnProps
    };

    state = nextState;
    ownProps = nextOwnProps;
    if (!deepEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  }
}

export default connectAdvanced(selectorFactory)(CreateCoupon);
