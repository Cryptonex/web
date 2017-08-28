import { connect } from 'react-redux';

import Activation from './view';
import {activation} from './actions';


const mapDispatchToProps = (dispatch) => {
  return {
    updateForm: (field, value) => {
      dispatch(activation.updateForm(field, value));
    },
    submit: (form) => {
      dispatch(activation.submit(form));
    },
    dispatch: params => {
      dispatch(params);
    }
  }
};

const mapStateToProps = state => {
  return {
    activationForm: state.users.activation.activationForm,
    error: state.users.activation.error,
    processing: state.users.activation.processing
  }
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(Activation);