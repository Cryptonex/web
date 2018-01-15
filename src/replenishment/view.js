import React, { Component } from 'react';
import DropCurrancy from './components/drop';
import CN from 'classnames';
import Purse from './components/purse';
import Fiat from './components/Fiat';


class Replenishment extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cnx: 0,
      value: 0,
      priceBtc: 0.0005,
      priceETH: 0.007,
      current: 'cnx',
      content: 'fiat'
    }
  }

  componentDidMount() {
    const { getWallets } = this.props;
    getWallets();
  }

  renderFiat() {
    const state = { ...this.state };
    if ('fiat' !== this.state.content) {
      return null;
    }

    return <Fiat />;
  }

  render() {
    const { wallets, profile, rates, fetchChangeStatusConvert, proccesingStatus } = this.props;

    return (
      <div className="replenishment">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <p style={{marginBottom: '20px'}}>Make a deposit</p>
              <div className="replenishment__payments-buttons">
                <a className={CN({active: this.state.content == "cnx"})}
                   onClick={this.onChangeContent.bind(this, "cnx")}>
                  <img src={require('assets/images/Big-button_Cryptonex.png')} alt=""/>
                </a>
                <a className={CN({active: this.state.content == 'btc'})}
                   onClick={this.onChangeContent.bind(this, 'btc')}>
                  <img src={require('assets/images/Big-button_Bitcoin.png')} alt=""/></a>
                <a className={CN({active: this.state.content == "eth"})}
                   onClick={this.onChangeContent.bind(this, "eth")}>
                  <img src={require('assets/images/Big-button_Ethereum.png')} alt=""/>
                </a>
                <a className={CN({active: this.state.content == "fiat"})}
                   onClick={this.onChangeContent.bind(this, "fiat")}>
                  <img src={require('assets/images/Big-button_Fiat.png')} alt=""/>
                </a>
              </div>
              <div className="default__info">
                <div className="replenishment__info">
                  {(this.state.content != "cnx" && this.state.content != "fiat")?
                  <label style={{marginTop: '10px'}}>
                    <input type="checkbox" checked={profile.info.deposit_auto_convert}
                           onChange={e => !proccesingStatus ? fetchChangeStatusConvert(!profile.info.deposit_auto_convert): null}/>
                    <span>Autoconvert into CNX</span>
                    {proccesingStatus ? <span><i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i></span>:null}
                  </label> :null}
                  <div className="replenishment__payments">
                    {wallets.filter(item => item.currency == this.state.content).map((item, index) => {
                      return <Purse wallet={item} key={index} />
                    })}
                    {this.renderFiat()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          { (profile.info.eth_cnx_bonus > 0) ?
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="default__info">
                  <h5>Bounty program</h5>
                  <h5>You have: {profile.info.eth_cnx_bonus} bonus CNX</h5>
{/*                    <p>According to our Bounty program, we created and started sending CNX (ETH) tokens.
                    These tokens are not sold. You can exchange these tokens for CNX coin 1:1 in the backoffice.
                    To do this you should sign up and transfer CNX (ETH) tokens from your Ethereum wallet.
                    You can use your bonus. If you buy CNX coins in your Cryptonex account, you get the 20%.bonus.
                  </p>
                  <p>For example, you transfer 1000 CNX (ETH) tokens and purchase 5000 CNX coins, using BTC or ETH.
                    You get 6000 CNX coins.</p>
                  <div className="withdraw__container-form__item">
                    <label className="form-label">Send your CNX (ETH) tokens:</label>
                    <input type="text" className="form form-full__width"
                           value={walletETH.hash} readOnly={true}/>

                  </div>*/}
                </div>
              </div>
            </div> : null }
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
