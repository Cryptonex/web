import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import ListMining from './List';
import {updateForm} from "../../main/actions/common";
import constants from "../../base/constants";
import { translate } from "../../base/utils";
import { loadListMining } from "./actions";
import {parseQueryString} from "../../base/utils";
import {listCoupon} from "../../Coupon/ListCoupon/actions";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};

  const getList = () => {
    const { pagination, location} = result,
      queryFilter = parseQueryString(location.search);
    dispatch(loadListMining({ ...queryFilter }, pagination.count));
  };

  const openModalDeposit = (depositID) => dispatch({ type: constants.MINING_DEPOSIT_SHOW_MODAL, payload: { depositID } });
  const openModalWithdraw = (depositID) => dispatch({ type: constants.MINING_WITHDRAW_SHOW_MODAL, payload: { depositID } });


  return (nextState, nextOwnProps) => {
    const { list, modalDeposit, modalWithdraw } = nextState.mining;

    const nextResult = {
      showModal: modalDeposit.showModal,
      loadingDeposit: modalDeposit.processing,
      showModalWithdraw: modalWithdraw.processing,
      openModalWithdraw,
      openModalDeposit,
      getList,
      ...list,
      ...nextOwnProps,
      dispatch,
    };

    state = nextState;
    ownProps = nextOwnProps;
    if (!deepEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  }
}

export default connectAdvanced(selectorFactory)(ListMining);
