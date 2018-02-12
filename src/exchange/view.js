import React, { Component } from 'react';
import Processing from 'elements/processing';
import Chart from './Chart';
import TablePair from './Table';
import { translate } from "../base/utils";

const listType = [
  {name: 'H1', type: '1h'},
  {name: 'D1', type: '1d'},
  {name: 'W1', type: '1w'}
];

class Exchange extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      type: '1h',
      pair: 'CNX/BTC'
    }
  }

  componentDidMount() {
    const { loadDataChart } = this.props;
    const { type, pair } = this.state;

    loadDataChart(type, pair);
  }

  componentWillReceiveProps(nextProps){
    const { rate, dispatch, form } = this.props;

    if (rate !== nextProps.rate) {
      const valueToAmount = Math.round((form.amount * nextProps.rate - (form.amount * nextProps.rate) * 0.1) * 100000000) / 100000000; // hard 0.1% fee

      dispatch({
        type: 'EXCHANGE_UPDATE_INPUTS',
        payload: {
          amount: form.amount,
          to_amount: valueToAmount
        }
      });
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

  render() {
    const {
      form, fromCurrencies, toCurrencies,
      rate, updateInput, updateSelect,
      submitForm, processing, charts, rates } = this.props;
    return(
      <div className="content">
        <form style={{position: 'relative'}} onSubmit={submitForm}>
          <div className="exchange">
            {processing ? <Processing/>: null}
            <div className="row row-grid row-bottom">
              <div className="col-xs-12 col-sm-3">
                <span className="label">{translate('page.you_give')}</span>
                <div className="form-compare">
                  <input type="number" value={form.amount} onChange={ev => updateInput('amount', ev.target.value)} />
                  <select value={form.from_currency} onChange={ev => updateSelect('from_currency', ev.target.value)}>
                    {fromCurrencies.map(item => <option value={item.currency} key={item.currency}>{item.currency.toUpperCase()}</option>)}
                  </select>
                </div>
              </div>

              <div className="col-xs-12 col-sm-3">
                <span className="label">{translate('page.exchange_rate')}</span>
                <div className="form-compare">
                  <span>{Math.round(rate*100000000)/100000000}</span>
                </div>
              </div>

              <div className="col-xs-12 col-sm-3">
                <span className="label">{translate('page.you_receive')}</span>
                <div className="form-compare">
                  <input type="number" value={form.to_amount} onChange={ev => updateInput('to_amount', ev.target.value)} />
                  <select value={form.to_currency} onChange={ev => updateSelect('to_currency', ev.target.value)}>
                    {toCurrencies.map(item => <option value={item.currency} key={item.currency}>{item.currency.toUpperCase()}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-xs-12 col-sm-3">
                <button className="button button-cover primary small">{translate('action.exchange')}</button>
                <span style={{paddingLeft: '30px', fontSize: '0.7rem'}}>{translate('page.fee')} <span style={{fontWeight: 'bold'}}> 0.1%</span></span>
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
            <Chart charts={charts} pair={this.state.pair} />
          </div>
        </div>
      </div>
    );
  }
}

export default Exchange;
