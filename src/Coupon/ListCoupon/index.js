import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import ListCoupon from './ListCoupon';
import { updateForm } from "../../main/actions/common";
import constants from 'base/constants';
import { listCoupon } from "./actions";
import {parseQueryString} from "../../base/utils";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};
  
  const getList = () => {
    const { pagination, location} = result,
      queryFilter = parseQueryString(location.search);
    dispatch(listCoupon({ ...queryFilter }, pagination.count));
  };
  
  return (nextState, nextOwnProps) => {
    const { listCoupon } = nextState.coupon;
    
    const nextResult = {
      getList,
      ...nextOwnProps,
      ...listCoupon,
    };

    state = nextState;
    ownProps = nextOwnProps;
    if (!deepEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  }
}

export default connectAdvanced(selectorFactory)(ListCoupon);
