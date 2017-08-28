import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import Processing from 'elements/processing';


const fields = [
  {name: 'email', placeholder: 'Email'},
  {name: 'password', placeholder: 'Password'},
  {name: 'confirm', placeholder: 'Confirm password'},
  {name: 'code', placeholder: 'Referral code'}
];

class Registration extends Component {
  constructor(){
    super(...arguments);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'USERS_REGISTRATION_LEAVE_PAGE'})
  }

  render() {
    const { registrationForm, updateForm, submit, error, processing} = this.props;
    return (
      <div className="registration">
        <div className="registration__form">
          <div className="registration__form-logo">
          </div>
          <div className="registration__form-title">
            <p className="registration__form-title__item">
              Cryptonex
            </p>
            <p className="registration__form-title__description">
              Join the project
            </p>
          </div>
          {processing ? <Processing />:null}
          <div className="registration__form-container">
            {fields.map((item, index)=> {
              return (<div className="registration__form-container__item" key={index}>
                <input type={(item.name == 'email' || item.name == 'code') ? 'text': 'password'}
                       className="registration__form-container__item-input"
                       value={registrationForm[item.name]}
                       onChange={e => updateForm(item.name, e.target.value)}
                       placeholder={item.placeholder}/>
              </div>);
            })}
            <div className="registration__form-container__item">
              <Recaptcha
                sitekey="6Lf2mQ8UAAAAAHxT3TvPR2KMOYW2qS4g8j7qsLH8"
                render='explicit'
                elementID="registration__recaptcha"
                onloadCallback={console.log.bind(this, "recaptcha loaded")}
              />
              <div className="registration__form-container__error">
                {error}
              </div>
            </div>
            <div className="registration__form-container__item">
              <a className="registration__form-container__item-button"
                 onClick={e => console.log('reg')}>
                Create account
              </a>
            </div>

            <div className="registration__form-container__link">
              <Link to='/users/login' className="registration__form-container__link-item">
                Are you already registered? To come in!
              </Link>
              <Link to='/users/activation' className="registration__form-container__link-item">
                Account activation!
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Registration;