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
    const { loginForm, updateLoginForm, submitLoginForm, submitAuthForm,
            content, cancel, error, authForm, updateAuthForm, processing } = this.props;
    return (
      <div className="login content">
        <div className="login__form">
          <div className="login__form-title">
            <p className="login__form-title__description">
              Sign in
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
                         placeholder="Email" value={loginForm.login}
                         onChange={e => updateLoginForm('login', e.target.value)}/>
                </div>
                <div className="login__form-container__item">
                  <input type="password" className="login__form-container__item-input"
                         placeholder="Password"
                         style={{paddingRight: '120px'}}
                         onChange={e => updateLoginForm('password', e.target.value)}/>
                  <a href="/users/reset/password"
                     className="login__form-container__item-forgot">Forgot password?</a>
                </div>
                  <div className="login__form-container__item">
                    <div className="login__form-container__item-recaptcha">
{/*                      <Recaptcha
                        sitekey="6Lf2mQ8UAAAAAHxT3TvPR2KMOYW2qS4g8j7qsLH8"
                        render='explicit'
                        elementID="login__recaptcha"
                        onloadCallback={console.log.bind(this, "recaptcha loaded")}/>*/}
                        <div className="submit">
                          <a className="button button-cover primary"
                             onClick={e => submitLoginForm(loginForm)}>
                            Login
                          </a>
                        </div>

                    </div>
                  </div>
                {error ?
                <div className="login__form-container__item">
                  <div className="login__form-container__error">
                    {error}
                  </div>
                </div>: null}

                <div className="login__form-container__link">
                  <Link to='/users/registration' className="login__form-container__link-item">
                    Don't have an account? Create it.
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
                         onChange={e => updateAuthForm('code', e.target.value)}/>
                </div>
                {error ?
                <div className="login__form-container__item">
                  <div className="login__form-container__error">
                    {error}
                  </div>
                </div>: null}
                <div className="auth__form-container__buttons">
                  <div className="auth__form-container__buttons-item">
                    <a className="button button-cover primary"
                       onClick={e => cancel()}>
                      Cancel
                    </a>
                  </div>
                  <div className="auth__form-container__buttons-item">
                    <a className="button button-cover primary"
                       onClick={ev => submitAuthForm(authForm, loginForm.login)}>
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
