import React, { Component } from 'react';
import Processing from 'elements/processing';

class ChangePassword extends Component {
  render() {
    const { form, updateForm, submit, error, processing, success } = this.props;
    return (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="default__info">
            {processing ? <Processing />: null}
            <h5>Change password</h5>
            <div className="settings__form-item">
              <label className="form-label">Old password</label>
              <input type="password" className="form form-full__width"
                     value={form.old} onChange={e => updateForm('old', e.target.value)}/>
            </div>
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
            <div className="settings__form-item">
              <a className="settings__form-item__button"
                 onClick={e => submit(form)}>Change</a>
              <p className={error ? "error": 'success'}>
                {error || success}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChangePassword;