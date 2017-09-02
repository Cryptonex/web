import React, { Component } from 'react';
import Processing from 'elements/processing';
import CN from 'classnames';


let fields = [
  {name: 'amount', title: 'Amount:'},
  {name: 'to_hash', title: 'Send to:'},
];

class Withdraw extends Component {

  render() {
    const { updateForm, submit, error, form, processing, walletCnx } = this.props;
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
              <div className="col-md-8 offset-md-2">
                <div className="default__info">
                  <div className="withdraw__info">
                    <h5>
                      You have: {walletCnx.balance} CNX
                    </h5>
                  </div>
                  <div className="withdraw__info-text">
                    You can transfer CNX to your Cryptonex wallet (wallet for <a href="https://github.com/Cryptonex/release/raw/master/cryptonex-win.zip"> Windows</a>,
                    wallet for <a href="https://github.com/Cryptonex/release/raw/master/cryptonex-linux.tar.gz"> Linux</a>),
                    for example, for getting a reward from P-o-S mining. You can also withdraw coins to any
                    Cryptonex address.
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="withdraw__container-form default__info">
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