import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';
import Dropdown from 'elements/dropDown';

class Header extends Component {
  constructor() {
    super(...arguments);
  }

  onClick() {
    const _body = document.body.classList;
    const _class = 'expand';

    if (_body.contains(_class)) {
      _body.remove(_class);
    } else {
      _body.add(_class);
    }
  }

  render() {
    const { logout, wallets, profile } = this.props;
    const balanceTrigger = (
      <div className="col-sm-0 col-xs-0 user-info">
        <img src={require('assets/images/more-button.png')}  style={{maxWidth: '32px', cursor: 'pointer'}} alt=""/>
      </div>
    );

    return (
      <header className="header">
        <div className="row row-middle row-between">
          <div className="col-xs-0 col-sm-12 col-md-0">
            <div className="logotype">
              <Link to="/">
                <img src={require('assets/images/logotype.png')}  style={{maxWidth: '100%'}} />
              </Link>
            </div>

            <div className="mobile-button">
              <button className="button small" onClick={this.onClick.bind(this)}>
                <img src={require('assets/icons/menu.svg')} />
              </button>
            </div>
          </div>
          {profile.is_active ?
            <div className="col-xs-0 col-sm-12 col-md-0">
              <div className="row row-grid row-middle row-between">
                <div className="col-xs-0 col-sm-0">
                  <div className="">

                    <div className="row row-middle">
                      <div className="col-sm-0 col-xs-0 user-info">
                        <span>Balances:</span>
                      </div>
                      {[...wallets].sort((first, second) => second.currency === 'cnx').map((item, index) => {
                        const array = ['btc', 'cnx', 'eth'];
                        if (array.includes(item.currency)) {
                          return (
                            <div className="col-sm-0 col-xs-0" key={item.currency}>
                              {`${item.balance} ${item.currency.toUpperCase()}`}
                            </div>
                          );
                        }

                        return null;
                      })}
                      Fiat: <Dropdown trigger={balanceTrigger}>
                        <ul>
                          {wallets.sort((first, second) => first.currency > second.currency ).map(item => {
                            const array = ['btc', 'cnx', 'eth'];

                            if (!array.includes(item.currency)) {
                              const balance = item.type === 'crypto' ? Math.floor(Number(item.balance)*100000000) / 100000000: Math.floor(Number(item.balance * 100)) / 100;
                              return (
                                <li key={item.currency}>
                                  <button>{`${balance} ${item.currency.toUpperCase()}`}</button>
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ul>
                      </Dropdown>
                    </div>
                  </div>
                </div>

                <div className="col-xs-none col-sm-0">
                  <div className="row row-middle">
                    <div className="col-xs-0 col-sm-0">
                      <div className="user-menu">
                        <Link to="/app/settings" className="button button-cover primary small">Settings</Link>
                        <a className="button button-cover primary small" onClick={e => logout()}>Sign out</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>: null}
        </div>

        <div className="mobile-overlay" onClick={this.onClick.bind(this)}></div>
      </header>
    );
  }
}

export default Header;
