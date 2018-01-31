import React, { PureComponent } from 'react';


import Code from './code';
import Processing from 'elements/processing';


class TwoFaEnable extends PureComponent {

  render() {
    const { form, error, url, updateForm, getQrcodeUrl, processing, setEnable2fa} = this.props;

    return(
      <div className="col-md-7">
        <div className="default__info" style={{height: "100%"}}>
          {processing ? <Processing />: null}
          <div className="row">
            <div className="col-md-6">
              <h5>Enable two-step verification</h5>
              <p>For the sake of your account safety, activate the two-factor authentication (2FA). To do this you need the 6 - digit code. To get this code, download Google Authenticator and scan the QR code.</p>
              <div className="settings__form-item">
                <label className="form-label">Enter the 6-digit code:</label>
                <input type="text" className="form" placeholder="code"
                       value={form.code} onChange={e => updateForm('code', e.target.value)}/>
              </div>
              <div className="settings__form-item">
                { !url ?
                  <a className="button button-cover primary small"
                     onClick={e => getQrcodeUrl()}>Show Qr code</a> :
                  <a className="button button-cover primary small"
                     onClick={e => setEnable2fa(form, true)}>Enable</a>}
                  <p className="error">
                    {error}
                  </p>
              </div>
            </div>
            <div className="col-md-6">
              <h5 style={{textAlign: 'center'}}>Qr code</h5>
              {url ? <Code url={url}/> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default TwoFaEnable;
