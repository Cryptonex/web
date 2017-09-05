import React, { PureComponent } from 'react';
import Processing from 'elements/processing';



class Changer extends PureComponent {
  render() {
    const { form, updateForm, submitChanger, error, processing } = this.props;
    const { key } = this.props.match.params
    return (
      <div className="col-md-8 offset-md-2">
        <div className="default__info">
          {processing ? <Processing />: null}
          <h5>Change password</h5>
          <p>Set minimum password length value to 6</p>
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
               onClick={e => submitChanger(form, key)}>Change</a>
            <p className="error">
              {error}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Changer;