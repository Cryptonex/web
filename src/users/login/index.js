import { connect } from 'react-redux';

import Login from './view';
import {login, auth} from './actions';


const mapDispatchToProps = (dispatch) => {
  return {
    updateFormLogin: (field, value) => {
      dispatch(login.updateForm(field, value));
    },
    submitLogin: (form) => {
      dispatch(login.submit(form));
    },
    cancel: ()=> {
      dispatch(auth.cancel());
    },
    updateFormAuth: (field, value) => {
      dispatch(auth.updateForm(field, value));
    },
    submitAuth: form => {
      dispatch(auth.submit(form));
    },
    dispatch: params => {
      dispatch(params);
    }
  }
};

const mapStateToProps = state => {
  return {
    loginForm: state.users.login.loginForm,
    content: state.users.login.content,
    error: state.users.login.error,
    authForm: state.users.login.authForm,
    processing: state.users.login.processing
  }
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(Login);