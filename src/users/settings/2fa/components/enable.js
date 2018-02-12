import React, { PureComponent } from 'react';
import { translate } from "../../../../base/utils";

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
              <h5>{translate('page.enable_2fa')}</h5>
              <p>{translate('page.text_google_2fa')}</p>
              <div className="settings__form-item">
                <label className="form-label">{translate('form.enter_google_2fa_code')}:</label>
                <input type="text" className="form"
                       value={form.code} onChange={e => updateForm('code', e.target.value)}/>
              </div>
              <div className="settings__form-item">
                { !url ?
                  <a className="button button-cover primary small"
                     onClick={e => getQrcodeUrl()}>{translate('action.show_qr')}</a> :
                  <a className="button button-cover primary small"
                     onClick={e => setEnable2fa(form, true)}>{translate('action.enable')}</a>}
              </div>
              <div className="settings__form-item">
                <p className="error">
                  {error}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <h5 style={{textAlign: 'center'}}>{translate('page.qr_code')}</h5>
              {url ? <Code url={url}/> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default TwoFaEnable;
