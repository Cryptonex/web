import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import Login from './view';
import {login, auth} from './actions';


const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({...login, ...auth}, dispatch),
    dispatch: params => dispatch(params),
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