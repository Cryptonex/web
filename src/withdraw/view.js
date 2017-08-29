import React, { Component } from 'react';
import Processing from 'elements/processing';
import CN from 'classnames';


let fields = [
  {name: 'amount', title: 'Amount:'},
  {name: 'address', title: 'Send to:'},
];

class Withdraw extends Component {

  render() {
    const { updateForm, submit, error, form, processing } = this.props;
    let classNameError = CN({
      'withdraw__container-form__item': true,
      'half': true,
      'success': 'Success!' == error,
      'error': error && 'Success!' != error
    });
    return(
      <div className="withdraw">
        <div className="withdraw__container">
          {processing ? <Processing/>: null}
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="withdraw__container-form">
                  {fields.map((item, index) =>
                    <div className="withdraw__container-form__item" key={index}>
                      <label className="form-label">{item.title}</label>
                      <input type="text" className="form form-full__width"
                             onChange={e => updateForm(item.name, e.target.value)}/>
                    </div>
                  )}
                  <div className="withdraw__container-form__item">
                    <div className={classNameError}>
                      {error}
                    </div>
                    <div className="withdraw__container-form__item-button">
                      <a className="withdraw__container-form__item-button__link"
                         onClick={e => submit(form)}>Send</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Withdraw;