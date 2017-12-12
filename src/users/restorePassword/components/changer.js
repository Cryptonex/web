import React, { PureComponent } from 'react';
import Processing from 'elements/processing';
import { Redirect } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';

class Changer extends PureComponent {

  componentWillReceiveProps(){
    const { processing } = this.props;
    if (processing && this.recaptchaInstance) {
      this.recaptchaInstance.reset();
    }
  }

  onSubmit = () => {

    const { form, submitChanger, statusRecaptcha, dispatch } = this.props;
    const { key } = this.props.match.params;
    if (statusRecaptcha && form.google_recaptcha_response === '') {
      return dispatch({
        type: 'USERS_RESTORE_PASSWORD_FORM_ERROR',
        payload: {
          error: 'Fill in all the fields!'
        }
      });
    }
    submitChanger(form,key);
  };

  render() {
    const { form, updateForm, submitChanger, error, processing, statusRecaptcha} = this.props;
    const { key } = this.props.match.params;

    if (key.length != 32) {
      return <Redirect to="/users/reset/password"/>;
    }

    return (
      <div className="col-md-8 offset-md-2">
        <div className="default__info">
          {processing ? <Processing />: null}
          <h5>Change password</h5>
          <div className="settings__form-item">
            <label className="form-label">New password</label>
            <input type="password" className="form form-full__width"
                   value={form.new} onChange={e => updateForm('new', e.target.value)}/>
          </div>
          <div className="settings__form-item">
            <label className="form-label">Confirm password</label>
            <input type="password" className="form form-full__width"
                   value={form.confirm} onChange={e => updateForm('confirm', e.target.value)}/>
          </div>
          <div className="settings__form-item" style={{marginBottom: 0}}>
            <p className='error' style={{marginLeft: 0}}>
              {error}
            </p>
          </div>
          { statusRecaptcha ? <Recaptcha
            sitekey="6Lf2mQ8UAAAAAHxT3TvPR2KMOYW2qS4g8j7qsLH8"
            render='explicit'
            elementID="login__recaptcha"
            onloadCallback={console.log.bind(this, "recaptcha loaded")}
            verifyCallback={hash => updateForm('google_recaptcha_response', hash)}
            expiredCallback={() => updateForm('google_recaptcha_response', '')}
            ref={e => this.recaptchaInstance = e}
          />: null }
          <div className="settings__form-item" style={{marginTop: '10px'}}>
            <a className="button button-cover primary small"
               onClick={this.onSubmit}>Change</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Changer;
