import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { translate } from "../base/utils";

const propTypes = {
  path: PropTypes.array
};
  
const defaultProps = {
  path: [
    { name: 'page.deposit', pathname: '/app/deposit' },
    { name: 'page.transactions', pathname: '/app/transactions' },
    { name: 'page.withdraw', pathname: '/app/withdraw' },
    { name: 'page.exchange', pathname: '/app/exchange' },
    { name: 'page.settings', pathname: '/app/settings' },
    { name: 'page.sign_in', pathname: '/users/login' },
    { name: 'page.sign_up', pathname: '/users/registration' },
    { name: 'page.restore', pathname: '/users/reset' },
    { name: 'page.p2p-service', pathname: '/app/p2p' },
  ]
};

class Breadcrumbs extends Component {
  constructor() {
    super(...arguments);
  }

  className = (path) => {
    if (location.pathname === path) {
      return "button button-cover primary small";

    }

    return "button button-outline primary small";
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

    if (pathObj.pathname === '/app/settings') {
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

    if (pathObj.pathname === '/app/p2p') {
      return (
        <div className="breadcrumbs">
          <ul className="clear inline">
            <li>
              <NavLink
                className={this.className("/app/p2p/adverts")}
                to='/app/p2p/adverts'>
                {translate('page.adverts')}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={this.className('/app/p2p/adverts/create')}
                to="/app/p2p/adverts/create"
              >
                {translate('page.create_advert')}
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
              {typeof pathObj !== 'undefined' ? translate(pathObj.name): 'Cryptonex'}
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
