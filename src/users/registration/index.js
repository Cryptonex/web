import { connect } from 'react-redux';

import Registration from './view';
import {registration} from './actions';


const mapDispatchToProps = (dispatch) => {
  return {
    updateForm: (field, value) => {
      dispatch(registration.updateForm(field, value));
    },
    submit: (form) => {
      dispatch(registration.submit(form));
    },
    dispatch: params => {
      dispatch(params);
    }
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