import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import ActivateCoupon from './ActivateCoupon';
import { updateForm } from "../../main/actions/common";
import constants from 'base/constants';
import {createCoupon} from "../CreateCoupon/actions";
import { activateCoupon } from "./actions";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};

  const updateField = (field, value) => dispatch(updateForm(field, value, constants.COUPON_ACTIVATE_UPDATE_FORM));
  const activate = () => {

    let data = { ...result.form };

    for (let prop in data) {
      if (!data[prop]) {
        delete data[prop];
      }
    }

    dispatch(activateCoupon(data));
  };
  
  return (nextState, nextOwnProps) => {
    const { activateCoupon } = nextState.coupon;
    
    const nextResult = {
      activate,
      ...nextOwnProps,
      ...activateCoupon,
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

export default connectAdvanced(selectorFactory)(ActivateCoupon);
