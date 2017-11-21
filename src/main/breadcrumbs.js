import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

  render() {
    const { path } = this.props;
    const pathObj = path.filter(item => location.pathname.indexOf(item.pathname) !== -1)[0];
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
