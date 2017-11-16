import React, { Component } from 'react';
import Dropdown from 'elements/dropDown';
import Processing from 'elements/processing';


class Convert extends Component {
  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    const { dispatch, wallets } = this.props;
    dispatch({
      type: 'INIT_CONVERT',
      payload: {
        wallets
      }
    });
  }

  render() {
    const {
      form,
      updateForm,
      wallets,
      currentWallets,
      changeRate,
      rates,
      userInfo,
      processing,
      submitForm
    } = this.props;

    if (currentWallets.from === null || currentWallets.to === null) {
      return null;
    }

    let currentRate = rates.filter((rate) => {
      return (
        currentWallets.from.currency === rate.base_currency &&
        currentWallets.to.currency === rate.rel_currency_id) ||
      (currentWallets.to.currency === rate.base_currency &&  currentWallets.from.currency === rate.rel_currency_id)
    })[0];

    currentRate = (currentWallets.from.currency === currentRate.base_currency) ?
      currentRate.rate: 1 / currentRate.rate;


    return (
      <div className="container convert">
        <div className="row">
          <div className="offset-md-2 col-md-8">
{/*            <div className="default__info">
              {processing ? <Processing/>: null}
              <h5>Convert</h5>
              <div className="row">
                <div className="col-md-6 from__input">
                  <label>Send</label>
                  <div style={{position: 'relative'}}>
                    <input
                      type="text"
                      value={form.amount}
                      onChange={(e) => updateForm('amount', e.target.value)}
                    />
                    <span>Current Rate: {currentRate} </span>
                    <div className="currency">
                      <Dropdown
                        trigger={
                          <button className="button arrow-down">
                            {currentWallets.from.currency.toUpperCase()}
                          </button>
                        }>
                        <ul>
                          {
                            wallets.map((el, i) => {
                              if (
                                currentWallets.from.currency === el.currency ||
                                currentWallets.to.currency === el.currency
                              ) {
                                return null;
                              }

                              return (
                                <li key={i}>
                                  <button
                                    className="button"
                                    onClick={e => changeRate('from', el) }
                                  >
                                    <span>{el.currency.toUpperCase()}</span>
                                  </button>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 to__input">
                  <label>You receive</label>
                  <div style={{position: 'relative'}}>
                    <input type="text" readOnly={true} value={form.amount * currentRate}/>
                    <div className="currency">
                      <Dropdown
                        trigger={
                          <button className="button arrow-down">
                            {currentWallets.to.currency.toUpperCase()}
                          </button>
                        }>
                        <ul>
                          {
                            wallets.map((el, i) => {
                              if (
                                currentWallets.from.currency === el.currency ||
                                currentWallets.to.currency === el.currency
                              ) {
                                return null;
                              }

                              return (
                                <li key={i}>
                                  <button
                                    className="button"
                                    onClick={e => changeRate('to', el) }
                                  >
                                    <span>{el.currency.toUpperCase()}</span>
                                  </button>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                { userInfo.auth_2fa ?
                  <div className="col-md-8" style={{marginTop: '20px'}}>
                    <label className="form-label">Enter the 6-digit code by Google Authenticator:</label>
                    <input type="text"
                           value={form.auth_2fa_code}
                           onChange={e => updateForm('auth_2fa_code', e.target.value)}
                           className="form form-full__width"
                           style={{borderWidth: '1px'}}/>
                  </div>: null }
                <div className="col-md-12" style={{marginTop: '20px'}}>
                  <a className="withdraw__container-form__item-button__link"
                     onClick={e => submitForm(form, wallets) }
                     >Convert</a>
                </div>
              </div>
            </div>*/}
          </div>
          <div className="offset-md-2 col-md-8">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Address</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((wallet, index) => {
                  return (
                    <tr key={index}>
                      <td>{wallet.currency.toUpperCase()}</td>
                      <td>{wallet.hash}</td>
                      <td>{wallet.balance}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Convert;
