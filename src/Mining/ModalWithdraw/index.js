import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import ModalWithdraw from './ModalWithdraw';
import {updateForm} from "../../main/actions/common";
import constants from "../../base/constants";
import { translate } from "../../base/utils";
import { withdrawDeposit } from "./actions";
import modalWithdraw from "./reducers";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};

  const closeModal = () => dispatch({ type: constants.MINING_WITHDRAW_CLOSE_MODAL });
  const updateField = (field, value) => dispatch(updateForm(field, String(value), constants.MINING_WITHDRAW_UPDATE_FORM));

  const withdraw = () => {
    const { form, depositID } = result;

    if (form.amount === '') {
      return dispatch({
        type: constants.MINING_WITHDRAW_VALIDATE_FORM,
        payload: { field: 'amount', message: translate('coupon.field_empty', { field: translate('form.amount') })}
      });
    }

    dispatch(withdrawDeposit({ ...form, mining_id: depositID }))
  };

  return (nextState, nextOwnProps) => {
    const { modalWithdraw } = nextState.mining;

    const nextResult = {
      withdraw,
      updateField,
      closeModal,
      ...modalWithdraw,
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

export default connectAdvanced(selectorFactory)(ModalWithdraw);
