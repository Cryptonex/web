import React, { PureComponent } from 'react';
import Processing from 'elements/processing';
import { translate } from "base/utils";

class TwoFaDisable extends PureComponent {
  render() {
    const { form, error, updateForm, processing, setEnable2fa} = this.props;

    return(
      <div className="col-md-7" style={{height: "100%"}}>
        <div className="default__info">
          {processing ? <Processing />: null}
          <div className="row">
            <div className="col-md-12">
              <h5>{translate('page.disable_2fa')}</h5>
              <p>{translate('page.text_google_2fa_disable')}</p>
              <div className="settings__form-item">
                <label className="form-label">{translate('form.enter_google_2fa_code')}:</label>
                <input type="text" className="form form-full__width"
                       value={form.code} onChange={e => updateForm('code', e.target.value)}/>
              </div>
              <div className="settings__form-item">
                <a className="button button-cover primary small"
                   onClick={e => setEnable2fa(form, false)}>{translate('action.disable')}</a>
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

