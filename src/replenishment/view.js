import React, { Component } from 'react';
import DropCurrancy from './components/drop';
import CN from 'classnames';
import Purse from './components/purse';
class Replenishment extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cnx: 0,
      value: 0,
      priceBtc: 0.0005,
      priceETH: 0.007,
      current: 'btc',
      content: 'btc'
    }
  }

  componentDidMount() {
    const { getWallets } = this.props;
    getWallets();
  }

  render() {
    const { wallets, profile } = this.props;
    let price = this.state.current == 'btc' ? this.state.priceBtc : this.state.priceETH;
    let value = this.state.value;
    let number = Math.round(value / price * 1000000, 2) / 1000000;
    let walletETH = wallets.filter(wallet => wallet.currency == 'eth')[0];
    return (
      <div className="replenishment">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="default__info">
                  <div className="replenishment__info">
                    <div className="replenishment__info-text">
                      <h5>Welcome to your account!</h5>
                      Here you will be able to deposit funds and purchase CNX, using BTC or ETH.<br/>
                      The calculator is provided for your convenience. You can write down the number of BTC / ETH coins to know the sum, that you will get in your CNX wallet.
                    </div>
                    <div className="replenishment__container-current">
                      1 CNX = 0.0005 BTC | 1 CNX = 0.007 ETH
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
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="default__info">
                  <div className="replenishment__info">
                    <div className="replenishment__info-title">
                      <h5>Make a deposit</h5>
                    </div>
                    Deposit is automatically transferred in CNX.
                    <div className="replenishment__payments">
                      <div className="replenishment__payments-buttons">
                        <a className={CN({active: this.state.content == 'btc'})}
                           onClick={this.onChangeContent.bind(this, 'btc')}>Bitcoin</a>
                        <a className={CN({active: this.state.content == "eth"})}
                           onClick={this.onChangeContent.bind(this, "eth")}>Ether</a>
                      </div>
                      {wallets.filter(item => item.currency == this.state.content).map((item, index) => {
                        return <Purse wallet={item} key={index} />
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="default__info">
                  <h5>Bounty program</h5>
                  <h5>You have: {profile.info.eth_cnx_bonus} bonus CNX</h5>
                  <p>According to our Bounty program, we created and started sending CNX (ETH) tokens.
                    The tokens are not sold. You can exchange these tokens to CNX coin 1:1 in backoffice.
                    For this you should sign up and transfer CNX (ETH) tokens from your Ethereum wallet.
                    You can use your bonus. If you buy CNX coin in your Cryptonex account, you get the bonus of 20%.
                  </p>
                  <p>For example, you transfer 1000 CNX (ETH) tokens and purchase 5000 CNX coins, using BTC or ETH. You get 6000 CNX coins.</p>
                  <div className="withdraw__container-form__item">
                    <label className="form-label">Send your CNX (ETH) tokens:</label>
                    <input type="text" className="form form-full__width"
                           value={walletETH.hash} readOnly={true}/>

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

  onChangeContent(content, ev) {
    const state = Object.assign({}, this.props.state);
    state.content = content;
    this.setState(state);
  }

}

export default Replenishment;