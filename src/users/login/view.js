import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { Link } from 'react-router-dom';

import Transition from 'react-transition-group/Transition';
import Processing from 'elements/processing';

class Login extends Component {
  constructor(){
    super(...arguments);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'USERS_LOGIN_LEAVE_PAGE'})
  }

  render() {
    const { loginForm, updateFormLogin, submitLogin, submitAuth,
            content, cancel, error, authForm, updateFormAuth, processing} = this.props;
    return (
      <div className="login">
        <div className="login__form">
          <div className="login__form-logo">
          </div>
          <div className="login__form-title">
            <p className="login__form-title__item">
              Cryptonex
            </p>
            <p className="login__form-title__description">
              Login in to the project
            </p>
          </div>
          {processing ? <Processing />:null}
          <Transition in={content == 'login'} timeout={1300}
                      unmountOnExit={true}>
            {(state) => {
              return(
                <div className={`login__form-container ${state}`}>
                <div className="login__form-container__item">
                  <input type="text" className="login__form-container__item-input"
                         placeholder="Email" value={loginForm.email}
                         onChange={e => updateFormLogin('email', e.target.value)}/>
                </div>
                <div className="login__form-container__item">
                  <input type="password" className="login__form-container__item-input"
                         placeholder="Password"
                         onChange={e => updateFormLogin('password', e.target.value)}/>
                </div>
                <div className="login__form-container__item">
                  <Recaptcha
                    sitekey="6Lf2mQ8UAAAAAHxT3TvPR2KMOYW2qS4g8j7qsLH8"
                    render='explicit'
                    elementID="login__recaptcha"
                    onloadCallback={console.log.bind(this, "recaptcha loaded")}/>
                  <div className="login__form-container__error">
                    {error}
                  </div>
                </div>
                <div className="login__form-container__item">
                  <a className="login__form-container__item-button"
                     onClick={e => console.log('login')}>
                    Login
                  </a>
                </div>
                <div className="login__form-container__link">
                  <Link to='/users/registration' className="login__form-container__link-item">
                    You are not registred? Check in!
                  </Link>
                  <Link to='/users/activation' className="login__form-container__link-item">
                    Account activation!
                  </Link>
                </div>
              </div>
            )}}
          </Transition>
          <Transition in={content == 'auth'} timeout={1500} unmountOnExit={true}>
            {(state) => {
              return (
              <div className={`auth__form-container ${state}`}>
                <div className="login__form-container__item">
                  <input type="text" className="login__form-container__item-input"
                         placeholder="Authentication code" value={authForm.code}
                         onChange={e => updateFormAuth('code', e.target.value)}/>
                </div>
                {error ?
                <div className="login__form-container__item">
                  <div className="login__form-container__error">
                    {error}
                  </div>
                </div>: null}
                <div className="auth__form-container__buttons">
                  <div className="auth__form-container__buttons-item">
                    <a className="auth__form-container__buttons-item__cancel"
                       onClick={e => cancel()}>
                      Cancel
                    </a>
                  </div>
                  <div className="auth__form-container__buttons-item">
                    <a className="auth__form-container__buttons-item__authenticate"
                       onClick={ev => submitAuth(authForm)}>
                      Authenticate
                    </a>
                  </div>
                </div>
              </div>);
            }}
          </Transition>
        </div>
      </div>

    )
  }
}



export default Login;