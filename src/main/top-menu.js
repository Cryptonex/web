import React, {Component} from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  {title: 'Deposit', path: '/app/deposit'},
  {title: 'Withdraw', path: '/app/withdraw'},
  {title: 'Transactions', path: '/app/transactions'},
  {title: 'Referral link', path: '/app/referral'},
];

class TopMenu extends Component {

  constructor(){
    super(...arguments)
    this.state = {
      show_menu: false
    }
  }

  render() {
    const { logout, profile, walletCnx } = this.props;
    let className = this.state.show_menu ? 'show' : '';
    return (
      <div className="top-menu">
        <div className="container">
          <div className="navbar">
            <div className="top-menu__logo">
              <div className="top-menu__logo-item">
              </div>
            </div>
            <div className={`top-menu__routers ${className}`}>
              <ul className="top-menu__routers-list">
                {links.map((item, index) =>
                  <li className="top-menu__routers-list__item" key={index} onClick={this.handleShowMenu.bind(this)}>
                    <NavLink className="top-menu__routers-list__item-link"
                             to={item.path}>{item.title}</NavLink>
                  </li>
                )}
              </ul>
              {profile.is_active ?
              <div className="top-menu__routers-user">
                <p className="top-menu__routers-user__balance">Balance: {walletCnx.balance} <span>CNX</span></p>
                <Link className="top-menu__routers-user__settings"  to="/app/settings"
                      onClick={this.handleShowMenu.bind(this)}>
                  <img src={require('assets/images/settings.png')} alt=""/>
                  <span>Settings</span>
                </Link>
                <div className="top-menu__routers-user__logout" onClick={e => logout()}>
                  SIGN OUT
                </div>
              </div>: null}
            </div>
            <div className="menu-toggle">
              <button className="button button-icon button-circle" onClick={this.handleShowMenu.bind(this)}>
                <i className="material-icons">menu</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleShowMenu() {
    this.setState({show_menu: !this.state.show_menu})
  }

}

export default TopMenu;