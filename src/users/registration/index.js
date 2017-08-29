import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Registration from './view';
import actionsRegistration from './actions';


const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actionsRegistration, dispatch),
    dispatch: params => dispatch(params),
  }
};

const mapStateToProps = state => {
  return {
    registrationForm: state.users.registration.registrationForm,
    error: state.users.registration.error,
    processing: state.users.registration.processing
  }
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(Registration);