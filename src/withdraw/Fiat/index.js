import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import Fiat from './view';
import { updateForm } from "../../main/actions/common";
import constants from 'base/constants';
import * as actions from './actions';
import { regEmail } from "../../base/settings";
import notification from '@antd/notification';
import { translate } from "../../base/utils";
import tr from "../../translation/tr";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};

  return (nextState, nextOwnProps) => {
    const { CNXPaymentList, currencies } =  nextState.p2p.common,
      { fiat } = nextState.withdraw;

    const updateField = (field, value) => dispatch(updateForm(field, value, constants.WITHDRAW_FIAT_UPDATE_FORM));

    const withdraw = () => {
      const { form } = result;

      if (!form.amount) {
        return notification.error({ message: translate('error.is_empty', {field: `"${translate('form.amount')}"`})})
      }

      if (!form.currency) {
        return notification.error({ message: translate('validate.invalid_select_currency')})
      }

      if (!form.payment_system) {
        return notification.error({ message: translate('error.is_empty', {field: `"${translate('form.payment-system')}"`})})
      }

      if (form.payment_system.includes('advcash_email')) {
        if (form.email === '') {
          return notification.error({ message: translate('error.is_empty', {field: `"${translate('form.email')}"`})})
        }

        if (!regEmail.test(form.email)) {
          return notification.error({ message: translate('validate.invalid_email')})
        }
      }

      if (!form.note) {
        return notification.error({ message: translate('error.is_empty', {field: `"${translate('form.comment')}"`})})
      }

      dispatch(actions.withdrawFiat(form));
    };

    const nextResult = {
      payment_systems: CNXPaymentList.list.filter(item => item.currency === fiat.form.currency && item.withdraw),
      currencies: currencies.list.filter(item => item.type === 'fiat' && (item.currency === 'rub' || item.currency === 'eur' || item.currency === 'usd')),
      withdraw,
      updateField,
      ...fiat,
      ...nextOwnProps,
    };

    state = nextState;
    ownProps = nextOwnProps;

    if (!deepEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  }
}

export default connectAdvanced(selectorFactory)(Fiat);
