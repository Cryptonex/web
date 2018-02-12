import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from "../base/utils";

class Sidebar extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <aside className="sidebar">
        <nav className="nav-menu">
          <NavLink to="/app/deposit" activeClassName="active">
            <img src={require('assets/icons/Icon-Deposit_gray.png')} />
            <span>{translate('page.deposit')}</span>
          </NavLink>

          <NavLink to="/app/withdraw" activeClassName="active">
            <img src={require('assets/icons/Icon-Withdraw_gray.png')} />
            <span>{translate('page.withdraw')}</span>
          </NavLink>
          
          <NavLink to="/app/exchange" activeClassName="active">
            <img src={require('assets/icons/Icon-Exchange_gray.png')} />
            <span>{translate('page.exchange')}</span>
          </NavLink>
                    
          <NavLink to="/app/transactions" activeClassName="active">
            <img src={require('assets/icons/Icon-Transactions_gray.png')} />
            <span>{translate('page.transactions')}</span>
          </NavLink>
                              
{/*          <NavLink to="/support" activeClassName="active">
            <img src={require('assets/icons/Icon-Support_gray.png')} />
            <span>Support</span>
          </NavLink>*/}
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
