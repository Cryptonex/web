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

  componentDidUpdate(prevPrpos) {
    const {
      form,
      updateSelect,
      wallets,
      rates,
      updateInput
    } = this.props;

    if (prevPrpos.form.from_hash !== form.from_hash || prevPrpos.form.to_hash !== form.to_hash) {
      const fromCurrentWallet = wallets.filter(item => form.from_hash === item.hash)[0];

      const toCurrentWallet =  rates.filter(item => {
        return (fromCurrentWallet.currency === item.base_currency && item.convert_type ==="cross") ||
          (fromCurrentWallet.currency === item.rel_currency_id && item.convert_type ==="cross")
      });

      const toWallet = wallets.filter((item) => item.hash === form.to_hash)[0];

      const toRate = toCurrentWallet.filter((item) => {
        return (item.base_currency === fromCurrentWallet.currency && toWallet.currency === item.rel_currency_id) ||
          (item.base_currency === toWallet.currency && fromCurrentWallet.currency === item.rel_currency_id)
      })[0];


      let currentRate = fromCurrentWallet.currency !== 'cnx' ? toRate.ask: toRate.bid;
      currentRate = fromCurrentWallet.currency !== 'cnx' ? 1 / currentRate:  currentRate;
      updateInput('', '', form, currentRate)
    }


  }

  onSubmit = (ev) => {
    const { submit, form, wallets, submitForm} = this.props;
    ev.preventDefault();
    submitForm(form, wallets);
  };

  render() {
    const {
      form,
      updateSelect,
      wallets,
      rates,
      updateInput,
      userInfo,
      processing
    } = this.props;

    if (form.from_hash === '' && form.to_hash === '') {
      return null;
    }

    const fromCurrentWallet = wallets.filter(item => form.from_hash === item.hash)[0];

    const toCurrentWallet =  rates.filter(item => {
      return (fromCurrentWallet.currency === item.base_currency && item.convert_type ==="cross") ||
        (fromCurrentWallet.currency === item.rel_currency_id && item.convert_type ==="cross")
    });

    if (fromCurrentWallet.currency === 'cnx' || toCurrentWallet.length < 0) {
      <div className="content">
        <h1>Not exchanges</h1>
      </div>
    }

    const toWallet = wallets.filter((item) => item.hash === form.to_hash)[0];

    const toRate = toCurrentWallet.filter((item) => {
      return (item.base_currency === fromCurrentWallet.currency && toWallet.currency === item.rel_currency_id) ||
        (item.base_currency === toWallet.currency && fromCurrentWallet.currency === item.rel_currency_id)
    })[0];

    console.log(toCurrentWallet)
    let currentRate = fromCurrentWallet.currency !== 'cnx' ? toRate.ask: toRate.bid;
    currentRate = fromCurrentWallet.currency !== 'cnx' ? 1 / currentRate:  currentRate;

    return (
      <div className="content">
        <form style={{position: 'relative'}}  onSubmit={this.onSubmit}>
          <div className="exchange">
            {processing ? <Processing/>: null}
            <div className="row row-grid row-bottom">
              <div className="col-xs-12 col-sm-3">
                <span className="label">You give</span>
                <div className="form-compare">
                  <input type="text" onChange={e => updateInput('amount', e.target.value, form, currentRate)} value={form.amount} />
                  <select value={form.from_hash} onChange={e => updateSelect('from_hash', e.target.value, rates, wallets)}>
                    {
                      wallets.map((el, i) => {
                        return (
                          <option value={el.hash} key={i}>{el.currency.toUpperCase()}</option>
                        );
                      })
                    }
                  </select>
                </div>
              </div>

              <div className="col-xs-12 col-sm-3">
                <span className="label">Exchange rate</span>
                <div className="form-compare">
                  <span>{currentRate}</span>
                </div>
              </div>

              <div className="col-xs-12 col-sm-3">
                <span className="label">You receive</span>
                <div className="form-compare">
                  <input type="text" onChange={e => updateInput('to_amount', e.target.value, form, currentRate)} value={form.to_amount}/>
                  <select value={form.to_hash} onChange={e => updateSelect('to_hash', e.target.value, rates, wallets)}>
                    {
                      wallets.map((el, i) => {

                        if (form.from_hash === el.hash) {
                          return null;
                        }

                        const isRel = toCurrentWallet.some(item => {
                          return el.currency === item.rel_currency_id || el.currency === item.base_currency
                        });

                        if (!isRel) {
                          return null
                        }

                        return (
                          <option value={el.hash} key={i}>{el.currency.toUpperCase()}</option>
                        );
                      })
                    }
                  </select>
                </div>
              </div>

              { userInfo.auth_2fa ?
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8" style={{marginTop: '20px'}}>
                      <label className="form-label">Enter the 6-digit code by Google Authenticator:</label>
                      <input type="text"
                             value={form.auth_2fa_code}
                             onChange={e => updateInput('auth_2fa_code', e.target.value, form, rates)}
                             className="form form-full__width"
                             style={{borderWidth: '1px'}}/>
                    </div>
                  </div>
                </div>
                : null }

              <div className="col-xs-12 col-sm-3">
                <button className="button button-cover primary small">Exchange</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Convert;

