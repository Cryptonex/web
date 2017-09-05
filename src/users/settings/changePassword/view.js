import React, { Component } from 'react';


class ChangePassword extends Component {
  render() {
    const { form } = this.props;
    return (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="default__info">
            <div className="settings__form-item">
              <label className="form-label">Old password</label>
              <input type="text" className="form form-full__width" value={form.old}/>
            </div>
            <div className="settings__form-item">
              <label className="form-label">New password</label>
              <input type="text" className="form form-full__width" value={form.new}/>
            </div>
            <div className="settings__form-item">
              <label className="form-label">Confirm password</label>
              <input type="text" className="form form-full__width" value={form.confirm}/>
            </div>
            <div className="settings__form-item">
              <a className="settings__form-item__button"
                 onClick={e => null}>Change</a>
              <p className="error">
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChangePassword;