import { connect, connectAdvanced } from 'react-redux';
import deepEqual from 'fast-deep-equal';

import Current from './Current';
import {updateForm} from "../../main/actions/common";
import constants from "../../base/constants";
import { loadListTransaction, getData, loadDataCharts } from './actions';
import { parseQueryString } from "../../base/utils";

function selectorFactory(dispatch) {
  let ownProps = {};
  let state = {};
  let result = {};

  const loadTransactions = () => {
    const { pagination, match, location } = result,
      mining_id = match.params.mining_id,
      queryFilter = { ...parseQueryString(location.search) };
    dispatch(loadListTransaction({mining_id, ...queryFilter}, pagination.count))
  };

  const loadDataChart = (params) => {
    const { pagination, match, location } = result,
      mining_id = Number(match.params.mining_id);
    dispatch(loadDataCharts({mining_id}))
  };

  const getInfoMining = () => {
    const { pagination, match, location } = result,
      mining_id = Number(match.params.mining_id);

    dispatch(getData({ mining_id }));
  };

  return (nextState, nextOwnProps) => {
    const { current } = nextState.mining;
    const nextResult = {
      loadDataChart,
      getInfoMining,
      loadTransactions,
      ...current,
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

export default connectAdvanced(selectorFactory)(Current);
