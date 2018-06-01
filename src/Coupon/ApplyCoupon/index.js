import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import ApplyCoupon from './ApplyCoupon';
import { updateForm } from "../../main/actions/common";
import constants from 'base/constants';
import { applyCoupon } from "./actions";
import { translate } from "../../base/settings";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};

  const updateField = (field, value) => dispatch(updateForm(field, String(value), constants.COUPON_APPLY_UPDATE_FORM));
  
  const apply = () => {
    const { form } = result;
    
    if (!form.coupon) {
      return dispatch({
        type: 'COUPON_APPLY_VALIDATE_FORM',
        payload: { field: 'coupon', message: translate('coupon.field_empty', { field: translate('coupon.coupon') })}
      });
    }
    
    if (!form.amount) {
      return dispatch({
        type: 'COUPON_APPLY_VALIDATE_FORM',
        payload: { field: 'amount', message: translate('coupon.field_empty', { field: translate('form.amount') })}
      });
    }

    if (!form.currency) {
      return dispatch({
        type: 'COUPON_APPLY_VALIDATE_FORM',
        payload: { field: 'currency', message: translate('coupon.take_currency')}
      });
    }
    
    
    dispatch(applyCoupon(form))
  };
  
  
  return (nextState, nextOwnProps) => {
    const { currencies, wallets } = nextState.users.profile,
      { applyCoupon } = nextState.coupon,
      walletsCurrency = wallets.map(item => item.currency);
    
    const nextResult = {
      currencies: currencies.filter(item => item.type === 'crypto'),
      ...nextOwnProps,
      ...applyCoupon,
      apply,
      updateField
    };

    state = nextState;
    ownProps = nextOwnProps;
    if (!deepEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  }
}

export default connectAdvanced(selectorFactory)(ApplyCoupon);
