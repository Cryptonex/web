import React, { PureComponent } from 'react';
import Processing from 'elements/processing';



class Request extends PureComponent {
  render() {
    const { form, updateForm, submitRequest, error, processing, success } = this.props;
    return (
      <div className="col-md-8 offset-md-2">
        <div className="default__info">
          {processing ? <Processing />: null}
          <h5>Request new password</h5>
          <div className="settings__form-item">
            <label className="form-label">Your login</label>
            <input type="test" className="form form-full__width"
                   value={form.email} onChange={e => updateForm('email', e.target.value)}/>
          </div>
          <div className="settings__form-item" style={{marginBottom: 0}}>
            <p className={error ? 'error': 'success'} style={{marginLeft: 0}}>
              {error || success}
            </p>
          </div>

          <div className="settings__form-item">
            <a className="settings__form-item__button"
               onClick={e => submitRequest(form)}>Restore</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Request;