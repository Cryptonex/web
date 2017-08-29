import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Activation from './view';
import actionsActivation from './actions';


const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actionsActivation, dispatch),
    dispatch: params => dispatch(params),
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