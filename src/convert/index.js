import { connect } from 'react-redux';

import Convert from './view';
import { updateForm, changeRate, submitForm } from './actions';

const mapDispatchToProps = (dispatch) => {
  return {
    updateForm: (field, value) => dispatch(updateForm(field, value)),
    dispatch: param => dispatch(param),
    changeRate: (field, wallet) => dispatch(changeRate(field, wallet)),
    submitForm: (form, wallets) => dispatch(submitForm(form, wallets)),
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
