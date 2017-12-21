import React, { Component, PureComponent } from 'react';
import Dropdown from 'elements/dropDown';
import Processing from 'elements/processing';
import Chart from './Chart';
import TablePair from './Table';
import deepEqual from 'deep-equal';

const listType = [
  {name: 'H1', type: '1h'},
  {name: 'D1', type: '1d'},
  {name: 'W1', type: '1w'}
];

class Convert extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      type: '1h',
      pair: 'CNX/BTC'
    }
  }

  componentDidMount() {
    const { dispatch, wallets, loadDataChart } = this.props;
    const { type, pair } = this.state;
    dispatch({
      type: 'INIT_CONVERT',
      payload: {
        wallets
      }
    });

    loadDataChart(type, pair);
  }

  componentWillReceiveProps(nextProps){
    const {
      form,
      updateSelect,
      wallets,
      rates,
      updateInput
    } = this.props;

    if (!deepEqual(nextProps.rates, rates)) {
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

  onChangeType = (type) => {
    const state = { ...this.state };
    const { loadDataChart } = this.props;
    state.type = type;
    this.setState(state);
    loadDataChart(state.type, state.pair);
  };

  onChangePair = (pair) => {
    const state = { ...this.state };
    const { loadDataChart } = this.props;
    state.pair = pair;
    this.setState(state);
    loadDataChart(state.type, state.pair);
  };

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
      processing,
      charts
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
                  <input type="text"
                         onChange={e => updateInput('amount', e.target.value.replace(",","."), form, currentRate)}
                         value={form.amount} />
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
                  <span>{Math.round(currentRate*100000000)/100000000}</span>
                </div>
              </div>

              <div className="col-xs-12 col-sm-3">
                <span className="label">You receive</span>
                <div className="form-compare">
                  <input type="text" onChange={e => updateInput('to_amount', e.target.value.replace(",","."), form, currentRate)} value={form.to_amount}/>
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

              <div className="col-xs-12 col-sm-3">
                <button className="button button-cover primary small">Exchange</button>
                <span style={{paddingLeft: '30px', fontSize: '0.7rem'}}>Fee <span style={{fontWeight: 'bold'}}> 0.1%</span></span>
              </div>
            </div>
          </div>
        </form>
        <div className="row" style={{marginTop: '20px', position: 'relative'}}>
          {charts.processing ? <Processing/>: null}
          <div className="col-md-4 col-sm-12 col-xs-12">
            <TablePair rates={rates} onChangePair={this.onChangePair} pair={this.state.pair}/>
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12">
            <ul className="exchange-chart_list">
              {
                listType.map((item, index) => {
                  return (
                    <li
                      key={item.name}
                      className={item.type === this.state.type ? 'active': ''}
                      onClick={e => this.onChangeType(item.type)}
                    >
                      {item.name}
                    </li>
                  )
                })
              }
            </ul>
            <Chart charts={charts} />
          </div>
        </div>
      </div>
    )
  }
}

export default Convert;

