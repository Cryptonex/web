import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const propTypes = {
  path: PropTypes.array
};
  
const defaultProps = {
  path: [
    { name: 'Deposit', pathname: '/app/deposit' },
    { name: 'Transactions', pathname: '/app/transactions' },
    { name: 'Withdraw', pathname: '/app/withdraw' },
    { name: 'Exchange', pathname: '/app/exchange' },
    { name: 'Settings', pathname: '/app/settings' },
    { name: 'Sign in', pathname: '/users/login' },
    { name: 'Sign up', pathname: '/users/registration' },
    { name: 'Restore', pathname: '/users/reset' },
  ]
};

class Breadcrumbs extends Component {
  constructor() {
    super(...arguments);
  }

  className = (path) => {
    if (location.pathname.indexOf(path) === -1) {
      return "button button-outline primary small";
    }

    return "button button-cover primary small";
  };

  render() {
    const { path } = this.props;
    const pathObj = path.filter(item => location.pathname.indexOf(item.pathname) !== -1)[0];

    if (pathObj === undefined) {
      return (
        <div className="breadcrumbs">
          <ul className="clear inline">
            <li>
            <span>
              Cryptonex
            </span>
            </li>
          </ul>
        </div>
      )
    }

    if (pathObj.name === 'Settings') {
      return (
        <div className="breadcrumbs">
          <ul className="clear inline">
            <li>
              <NavLink
                className={this.className("/app/settings/security")}
                to="/app/settings/security">
                Security
              </NavLink>
            </li>
            <li>
              <NavLink
                className={this.className("/app/settings/api")}
                to="/app/settings/api"
              >
                Settings API
              </NavLink>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div className="breadcrumbs">
        <ul className="clear inline">
          <li>
            <span>
              {typeof pathObj !== 'undefined' ? pathObj.name: 'Cryptonex'}
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default Breadcrumbs;
