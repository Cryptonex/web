import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActivationTransaction from './view';
import * as actionsTransaction from './actions';

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionsTransaction, dispatch),
    dispatch: params => dispatch(params),
  }
};

const mapStateToProps = state => {
  return {
    ...state.activations.transaction,
  }
};


export default connect(
  mapStateToProps, mapDispatchToProps,
)(ActivationTransaction)