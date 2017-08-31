import { connect } from 'react-redux';

import Replenishment from './view'
import * as actionsProfile from 'users/profile/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    getWallets: () => dispatch(actionsProfile.getWallets()),
  }
};

const mapStateToProps = (state) => {
  return {
    wallets: state.users.profile.wallets,
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Replenishment)