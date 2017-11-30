import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';


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
                  <div className="user-info">
                    <span>Balances:</span>

                    <ul className="clear inline">
                      {[...wallets].reverse().map((item, index) => {
                        return (
                          <li key={item.currency}>
                            {`${item.balance} ${item.currency.toUpperCase()}`}
                          </li>
                        )
                      })}
                    </ul>
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
