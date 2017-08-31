import { connect } from 'react-redux';
import * as actionsReferral from './actions'
import {bindActionCreators} from 'redux';


import Referral from './view';

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actionsReferral, dispatch),
  }
};

const mapStateToProps = (state) => {
  return {
    profile: state.users.profile.current,
    ...state.referral,
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Referral)