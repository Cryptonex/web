import { connect } from 'react-redux';


import Withdraw from './view';
import withdraw from './actions';

const mapStateToProps = state => {
  return {
    form: state.withdraw.form,
    processing: state.withdraw.processing,
    error: state.withdraw.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
   updateForm: (field, value) => dispatch(withdraw.updateForm(field, value)),
   submit: form => dispatch(withdraw.submit(form)),
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Withdraw);