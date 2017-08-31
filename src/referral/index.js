import { connect } from 'react-redux';

import Referral from './view';

const mapStateToProps = (state) => {
  return {
    profile: state.users.profile.current
  }
};

export default connect(
  mapStateToProps, null
)(Referral)