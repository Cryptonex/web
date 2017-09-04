import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TwoFa from './view';
import * as actionsQrcode from './actions';


const mapStateToProps = state => {
  return {
    ...state.users.settings.qrcode,
    profile: state.users.profile.current
  }
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionsQrcode, dispatch),
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(TwoFa)