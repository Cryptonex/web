import { connect } from 'react-redux';

import Convert from './view';
import { updateSelect, changeRate, submitForm, updateInput } from './actions';

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelect: (field, value, toWallets, wallets) => dispatch(updateSelect(field, value, toWallets, wallets)),
    dispatch: param => dispatch(param),
    changeRate: (field, wallet) => dispatch(changeRate(field, wallet)),
    submitForm: (form, wallets) => dispatch(submitForm(form, wallets)),
    updateInput: (field, value, form, rate) => dispatch(updateInput(field, value, form, rate))
  }
};

const mapStateToProps = (state) => {
  return {
    ...state.convert,
    rates: state.users.profile.rates,
    wallets: state.users.profile.wallets,
    userInfo: state.users.profile.current.info
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Convert)
