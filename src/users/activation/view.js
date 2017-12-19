import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import Processing from 'elements/processing';


const fields = [
  {name: 'code', placeholder: 'Activation code'}
];

class Activation extends Component {
  componentDidMount() {
    const { match, submit} = this.props;
    const { key } = match.params;
    submit({code: key})
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'USERS_ACTIVATION_LEAVE_PAGE'})
  }

  render() {
    const { error, processing} = this.props;
    return (
      <div className="activation content">
        <div className="activation__form">
          <div className="activation__form-title">
            <p className="activation__form-title__description">
              Account Activation
            </p>
          </div>
          {processing ? <Processing />:null}
          <div className="activation__form-container">
            {error ?
            <div className="activation__form-container__item">
              <div className={error == 'success' ? "activation__form-container__success":
                                                   "activation__form-container__error"}>
                {error == 'success' ? 'Your account has been successfully activated.':
                  'ERROR. Your account has not been activated.'}
              </div>
            </div>: null}
            {error == 'success' ? <div className="activation__form-container__item">
              <a className="activation__form-container__item-button" href="/users/login">
                Sign in
              </a>
            </div> : null }
          </div>
        </div>
      </div>
    )
  }
}

export default Activation;
