import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import ModalDeposit from './ModalDeposit';
import {updateForm} from "../../main/actions/common";
import constants from "../../base/constants";
import { translate } from "../../base/utils";
import { applyDeposit } from "./actions";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};

  const closeModal = () => dispatch({ type: constants.MINING_DEPOSIT_CLOSE_MODAL });
  const updateField = (field, value) => dispatch(updateForm(field, String(value), constants.MINING_DEPOSIT_UPDATE_FORM));

  const deposit = () => {
    const { form, depositID } = result;

    if (form.amount === '') {
      return dispatch({
        type: constants.MINING_DEPOSIT_VALIDATE_FORM,
        payload: { field: 'amount', message: translate('coupon.field_empty', { field: translate('form.amount') })}
      });
    }

    dispatch(applyDeposit({ ...form, mining_id: depositID }))
  };

  return (nextState, nextOwnProps) => {
    const { modalDeposit } = nextState.mining;

    const nextResult = {
      deposit,
      updateField,
      closeModal,
      ...modalDeposit,
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

export default connectAdvanced(selectorFactory)(ModalDeposit);
