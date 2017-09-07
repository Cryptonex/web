import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Withdraw from './view';
import * as actionsWithdraw from './actions';

const mapStateToProps = state => {
  return {
    ...state.withdraw,
    walletCnx: state.users.profile.walletCnx,
    userInfo: state.users.profile.current.info
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