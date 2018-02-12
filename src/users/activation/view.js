import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import Processing from 'elements/processing';
import { translate } from "../../base/utils";

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
              {translate('page.activation_acc')}
            </p>
          </div>
          {processing ? <Processing />:null}
          <div className="activation__form-container">
            {error ?
            <div className="activation__form-container__item">
              <div className={error ==='success' ? "activation__form-container__success":
                                                   "activation__form-container__error"}>
                {error === 'success' ? translate('page.success_activated_acc'): translate('page.error_activated_acc')}
              </div>
            </div>: null}
            {error === 'success' ?
              <div className="activation__form-container__item">
                <a className="activation__form-container__item-button" href="/users/login">
                  {translate('page.sign_in')}
                </a>
            </div> : null }
          </div>
        </div>
      </div>
    )
  }
}

export default Activation;
