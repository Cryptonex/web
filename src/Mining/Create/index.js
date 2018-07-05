import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import CreateForm from './CreateForm';
import {updateForm} from "../../main/actions/common";
import constants from "../../base/constants";
import { createMining, loadMiningPool } from "./actions";
import { translate } from "../../base/utils";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};

  const updateField = (field, value) => dispatch(updateForm(field, value, constants.MINING_CREATE_UPDATE_FORM));


  const creatingMining = () => {
    const { form } = result;
    const data = { ...form };
    if (form.amount === '') {
      return dispatch({
        type: constants.MINING_CREATE_VALIDATE_FORM,
        payload: { field: 'amount', message: translate('coupon.field_empty', { field: translate('form.amount') })}
      });
    }

    if (form.amount < 1) {
      return dispatch({
        type: constants.MINING_CREATE_VALIDATE_FORM,
        payload: { field: 'amount', message: `${translate('form.amount-min', { field: translate('form.amount') })} 1 CNX`}
      });
    }

    if (form.description.length > 127) {
      return dispatch({
        type: constants.MINING_CREATE_VALIDATE_FORM,
        payload: { field: 'description', message: translate('mining.error_length_comment', { number: 127 })}
      });
    }

    dispatch(createMining(data));
  };

  const loadPool = () => dispatch(loadMiningPool());


  return (nextState, nextOwnProps) => {
    const { create } = nextState.mining;

    const nextResult = {
      updateField,
      creatingMining,
      loadPool,
      ...create,
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

export default connectAdvanced(selectorFactory)(CreateForm);
