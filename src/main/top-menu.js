import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  {title: 'Deposit', path: '/app/deposit'},
  {title: 'Withdraw', path: '/app/withdraw'},
  {title: 'Transactions', path: '/app/transactions'},
  {title: 'Referral link', path: '/app/referral'},
];

class TopMenu extends Component {
  render() {
    const { logout, profile, walletCnx } = this.props;

    return (
      <div className="top-menu">
        <div className="container">
          <div className="navbar">
            <div className="top-menu__logo">
              <div className="top-menu__logo-item">
              </div>
            </div>
            <div className="top-menu__routers">
              <ul className="top-menu__routers-list">
                {links.map((item, index) =>
                  <li className="top-menu__routers-list__item" key={index}>
                    <NavLink className="top-menu__routers-list__item-link"
                             to={item.path}>{item.title}</NavLink>
                  </li>
                )}
              </ul>
              {profile.is_active ?
              <div className="top-menu__routers-user">
                <p className="top-menu__routers-user__balance">Balance: {walletCnx.balance} <span>CNX</span></p>
                <div className="top-menu__routers-user__logout" onClick={e => logout()}>
                  SIGN OUT
                </div>
              </div>: null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TopMenu;