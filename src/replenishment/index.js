import { connect } from 'react-redux';

import Replenishment from './view'
import * as actionsProfile from 'users/profile/actions';
import { fetchChangeStatusConvert } from './actions';

const mapDispatchToProps = (dispatch) => {
  return {
    getWallets: () => dispatch(actionsProfile.getWallets()),
    fetchChangeStatusConvert: (status) => dispatch(fetchChangeStatusConvert(status)),
  }
};

const mapStateToProps = (state) => {
  return {
    wallets: state.users.profile.wallets,
    profile: state.users.profile.current,
    rates: state.users.profile.rates,
    ...state.replenishment
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Replenishment)
