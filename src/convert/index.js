import { connect } from 'react-redux';
import selectors from 'base/selectors';

import Convert from './view';
import { updateSelect, changeRate, submitForm, updateInput, loadDataChart } from './actions';

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelect: (field, value, toWallets, wallets) => dispatch(updateSelect(field, value, toWallets, wallets)),
    dispatch: param => dispatch(param),
    changeRate: (field, wallet) => dispatch(changeRate(field, wallet)),
    submitForm: (form, wallets) => dispatch(submitForm(form, wallets)),
    updateInput: (field, value, form, rate) => dispatch(updateInput(field, value, form, rate)),
    loadDataChart: (type, pair) => dispatch(loadDataChart(type, pair))
  }
};

const mapStateToProps = (state) => {
  return {
    ...state.convert,
    rates: selectors.ratesSelector(state),
    wallets: selectors.walletsSelector(state),
    userInfo: state.users.profile.current.info
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Convert)
