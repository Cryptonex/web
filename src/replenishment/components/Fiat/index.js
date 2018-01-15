import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import FiatForm from './view';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(actions, dispatch),
  }
};

const mapStateToProps = (state) => {
  return {
    ...state.replenishment.fiat,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FiatForm)

