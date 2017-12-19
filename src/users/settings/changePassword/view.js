import React, { Component } from 'react';
import Processing from 'elements/processing';
import Recaptcha from 'react-recaptcha';

class ChangePassword extends Component {
  componentWillReceiveProps(){
    const { processing } = this.props;
    if (processing && this.recaptchaInstance) {
      this.recaptchaInstance.reset();
    }
  }

  onSubmit = () => {
    const { form, submit, statusRecaptcha, dispatch } = this.props;
    submit(form);
  };

  render() {
    const { form, updateForm, submit, error, processing, success, statusRecaptcha } = this.props;
    return (

      <div className="col-md-5 col-xs-12 col-sm-12">
        <div className="default__info" style={{height: "100%"}}>
          {processing ? <Processing />: null}
          <h5>Change password</h5>
          <div className="settings__form-item">
            <label className="form-label">Old password</label>
            <input type="password" className="form form-full__width"
                   value={form.password_old} onChange={e => updateForm('password_old', e.target.value)}/>
          </div>
          <div className="settings__form-item">
            <label className="form-label">New password</label>
            <input type="password" className="form form-full__width"
                   value={form.password_new} onChange={e => updateForm('password_new', e.target.value)}/>
          </div>
          <div className="settings__form-item">
            <label className="form-label">Confirm password</label>
            <input type="password" className="form form-full__width"
                   value={form.confirm} onChange={e => updateForm('confirm', e.target.value)}/>
          </div>
          <div className="settings__form-item"style={{paddingTop: '10px'}}>
            <a className="button button-cover primary small"
               onClick={this.onSubmit}>Change</a>
            <p className={error ? "error": 'success'}>
              {error || success}
            </p>
          </div>
        </div>
      </div>

    )
  }
}

export default ChangePassword;
