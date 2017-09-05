import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RestorePassword from './view';
import * as actionsRestorePassword from './actions';

const mapStateToProps = state => {
  return {
    ...state.users.restorePassword,

  }
};

const mapDispatchToState = dispatch => {
  return {
    dispatch: (params) => dispatch(params),
    ...bindActionCreators(actionsRestorePassword, dispatch),
  }
};


export default connect(
  mapStateToProps, mapDispatchToState
)(RestorePassword)
