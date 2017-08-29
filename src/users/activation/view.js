import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import Processing from 'elements/processing';


const fields = [
  {name: 'code', placeholder: 'Activation code'}
];

class Activation extends Component {

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'USERS_ACTIVATION_LEAVE_PAGE'})
  }

  render() {
    const { activationForm, updateForm, submit, error, processing} = this.props;
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
              Account Activation
            </p>
          </div>
          {processing ? <Processing />:null}
          <div className="registration__form-container">
            {fields.map((item, index)=> {
              return (<div className="registration__form-container__item" key={index}>
                <input type='text'
                       className="registration__form-container__item-input"
                       value={activationForm[item.name]}
                       onChange={e => updateForm(item.name, e.target.value)}
                       placeholder={item.placeholder}/>
              </div>);
            })}
            {error ?
            <div className="registration__form-container__item">
{/*              <Recaptcha
                sitekey="6Lf2mQ8UAAAAAHxT3TvPR2KMOYW2qS4g8j7qsLH8"
                render='explicit'
                elementID="registration__recaptcha"
                onloadCallback={console.log.bind(this, "recaptcha loaded")}
              />*/}
              <div className="registration__form-container__error">
                {error}
              </div>
            </div>: null}
            <div className="registration__form-container__item">
              <a className="registration__form-container__item-button"
                 onClick={e => submit(activationForm)}>
                 Activate
              </a>
            </div>

            <div className="registration__form-container__link">
              <Link to='/users/login' className="registration__form-container__link-item">
                Are you already registered? To come in!
              </Link>
              <Link to='/users/registration' className="registration__form-container__link-item">
                You are not registred? Check in!
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Activation;