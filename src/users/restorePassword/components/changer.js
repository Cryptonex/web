import React, { PureComponent } from 'react';
import Processing from 'elements/processing';
import { Redirect } from 'react-router-dom';


class Changer extends PureComponent {

  render() {
    const { form, updateForm, submitChanger, error, processing } = this.props;
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
          <div className="settings__form-item">
            <a className="button button-cover primary"
               onClick={e => submitChanger(form, key)}>Change</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Changer;
