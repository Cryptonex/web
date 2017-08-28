import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  {title: 'Replenishment', path: '/replenishment'},
  {title: 'Transactions', path: '/transactions'},
  {title: 'Withdraw', path: '/withdraw'}
];

class TopMenu extends Component {
  render() {
    const {match} = this.props;
    return (
      <div className="top-menu">
        <div className="container">
          <div className="navbar">
            <div className="top-menu__logo">
              <div className="top-menu__logo-item">
              </div>
              <p className="top-menu__logo-title">Cryptonex</p>
            </div>
            <div className="top-menu__routers">
              <ul className="top-menu__routers-list">
                {links.map((item, index) =>
                  <li className="top-menu__routers-list__item" key={index}>
                    <NavLink className="top-menu__routers-list__item-link"
                             to={match.url + item.path}>{item.title}</NavLink>
                  </li>
                )}
              </ul>
              <div className="top-menu__routers-user">
                <p className="top-menu__routers-user__balance">Balance: 2400 <span>CNX</span></p>
                <div className="top-menu__routers-user__logout">
                  <span></span> Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TopMenu;