import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Withdraw from './view';
import * as actionsWithdraw from './actions';

const mapStateToProps = state => {
  return {
    form: state.withdraw.form,
    processing: state.withdraw.processing,
    error: state.withdraw.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
   ...bindActionCreators(actionsWithdraw, dispatch),
   dispatch: param => (dispatch(param)),
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Withdraw);