import React, { Component } from 'react';
import DropCurrancy from './components/drop';

class Replenishment extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cnx: 0,
      value: 0,
      priceBtc: 0.0005,
      priceETH: 0.007,
      current: 'btc'
    }
  }
  render() {
    let price = this.state.current == 'btc' ? this.state.priceBtc : this.state.priceETH;
    let value = this.state.value
    var number = Math.round(value / price * 10000 + value / price * 10000 / 100 * 20, 2) / 10000;
    return (
      <div className="replenishment">
          <div className="replenishment__container">
            <div className="replenishment__container-logo">
              <div className="replenishment__container-logo__item"></div>
            </div>
            <div className="replenishment__container-balance">
              <p className="replenishment__container-balance__title">
                Account balance
              </p>
              <p className="replenishment__container-balance__current">
                2400 <span>cnx</span>
              </p>
              <p className="replenishment__container-balance__alternative">
                1 CNX = 0.0005 BTC or 0.007 ETH
              </p>
            </div>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="replenishment__container-current">
                  <div className="replenishment__container-current__title">
                    Count!
                  </div>
                  <div className="replenishment__container-current__container">
                    <div className="replenishment__container-current__container-input">
                      <input type="text"
                             onChange={this.onChange.bind(this)}
                             value={this.state.value}
                             placeholder="0.00"
                             className="replenishment__container-current__container-input__item"/>
                      <div className="absolute">
                        <DropCurrancy current={this.state.current} changeCurrent={this.changeCurrent.bind(this, name)} />
                      </div>

                    </div>
                    <div className="replenishment__container-current__container-value">
                      <p>{number}<span> CNX</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="replenishment__container-other">
                  <div className="replenishment__container-other__purse">
                    <p className="replenishment__container-other__purse-title">Wallet BTC:</p>
                    <p className="replenishment__container-other__purse-item">GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1</p>
                  </div>
                  <div className="replenishment__container-other__container">
                    <div className="replenishment__container-other__logo btc">
                    </div>
                    <div className="replenishment__container-other__code">
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="replenishment__container-other">
                  <div className="replenishment__container-other__purse">
                    <p className="replenishment__container-other__purse-title">Wallet ETH:</p>
                    <p className="replenishment__container-other__purse-item">GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1</p>
                  </div>
                  <div className="replenishment__container-other__container">
                    <div className="replenishment__container-other__logo eth">
                    </div>
                    <div className="replenishment__container-other__code">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }

  changeCurrent(ev,name){
    let state = this.state;
    state.current = name;
    this.setState(state);
  }

  onChange(ev) {
    let state = this.state;
    state.value = ev.target.value.replace(",",".");
    
    this.setState(state);
  }

}

export default Replenishment;