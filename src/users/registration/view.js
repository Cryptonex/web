import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import Processing from 'elements/processing';


const fields = [
  {name: 'email', placeholder: 'Email'},
  {name: 'password', placeholder: 'Password'},
  {name: 'confirm', placeholder: 'Confirm password'},
];

class Registration extends Component {
  constructor(){
    super(...arguments);
  }

  componentDidMount() {
    const { match, updateForm} = this.props;
    const { ref } = match.params;

    if (ref && Number(ref)) {
      updateForm('referer', Number(ref));
    }
  }

  componentWillReceiveProps() {
    const { processing } = this.props;
    if (processing && this.recaptchaInstance) {
      this.recaptchaInstance.reset();
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'USERS_REGISTRATION_LEAVE_PAGE'})
  }

  render() {
    const { registrationForm, updateForm, submit, error, processing} = this.props;
    return (
      <div className="registration content">
        <div className="registration__form">

          <div className="registration__form-title">
            <p className="registration__form-title__description">
              Create your account
            </p>
          </div>
          {processing ? <Processing />:null}
          <div className="registration__form-container">
            {fields.map((item, index)=> {
              return (<div className="registration__form-container__item" key={index}>
                <input type={(item.name == 'email' || item.name == 'code') ? 'text': 'password'}
                       className="registration__form-container__item-input"
                       value={registrationForm[item.name]}
                       onChange={e => item.name === 'email' ? updateForm(item.name, e.target.value.toLowerCase()):
                         updateForm(item.name, e.target.value)}
                       placeholder={item.placeholder}/>
              </div>);
            })}
            <div className="registration__form-container__item">
              <Recaptcha
               sitekey="6Lf2mQ8UAAAAAHxT3TvPR2KMOYW2qS4g8j7qsLH8"
               render='explicit'
               elementID="registration__recaptcha"
               onloadCallback={console.log.bind(this, "recaptcha loaded")}
               verifyCallback={hash => updateForm('google_recaptcha_response', hash)}
               expiredCallback={() => updateForm('google_recaptcha_response', '')}
               ref={e => this.recaptchaInstance = e}
               />
            </div>
            <div className="registration__form-container__item">
               <div className="submit">
                 <a className="button button-cover primary small"
                    onClick={e => submit(registrationForm)}>
                   Create account
                 </a>
               </div>
            </div>
            {error ?
            <div className="registration__form-container__item">
              <div className={error == 'success'? "registration__form-container__success" :
                                                  "registration__form-container__error"}>
                {error == 'success' ?
                  'Thank you for registration! The message with instructions for activation was sent to your e-mail.'
                  : error}
              </div>
            </div>: null}


            <div className="registration__form-container__link">
              <Link to='/users/login' className="registration__form-container__link-item">
                Already have an account? Sign in.
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Registration;
