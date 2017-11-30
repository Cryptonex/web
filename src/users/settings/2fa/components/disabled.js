import React, { PureComponent } from 'react';
import Processing from 'elements/processing';

class TwoFaDisable extends PureComponent {
  render() {
    const { form, error, updateForm, processing, setEnable2fa} = this.props;

    return(
      <div className="col-md-8" style={{height: "100%"}}>
        <div className="default__info">
          {processing ? <Processing />: null}
          <div className="row">
            <div className="col-md-12">
              <h5>Disable two-step verification</h5>
              <p>If you want to turn off 2FA, input the six-digit
                 code provided by the Google Authenticator app, then click "Disable".</p>
              <div className="settings__form-item">
                <label className="form-label">Enter the 6-digit code:</label>
                <input type="text" className="form form-full__width" placeholder="code"
                       value={form.code} onChange={e => updateForm('code', e.target.value)}/>
              </div>
              <div className="settings__form-item">
                <a className="button button-cover primary"
                   onClick={e => setEnable2fa(form, false)}>Disable</a>
                <p className="error">
                  {error}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TwoFaDisable;

