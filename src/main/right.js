import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
class RightBar extends  Component {
  constructor() {
    super(...arguments);
    this.state = {
      navBar: {
        hover: false,
      }
    }
  }


  render() {
    return (
      <div className="right">
        <div className="right-title">
          <p className="right-title__text">Menu</p>
        </div>

        <nav className="right-bar">
          <ul className="right-bar__list">
            <li className="right-bar__list-item"
                onMouseEnter={this.hoverMouseLink.bind(this)}
                onMouseLeave={this.leaveMouseLink.bind(this)}>
                <NavLink to="/summary"
                         isActive={this.oddEvent.bind(this)}
                         className="right-bar__list-item__link"
                         activeClassName="right-bar__list-item__link-active">
                Summary
              </NavLink>
            </li>
            <li className="right-bar__list-item"
                onMouseEnter={this.hoverMouseLink.bind(this)}
                onMouseLeave={this.leaveMouseLink.bind(this)}>
                <NavLink to="/transactions"
                         isActive={this.oddEvent.bind(this)}
                         className="right-bar__list-item__link"
                         activeClassName="right-bar__list-item__link-active">
                Transactions
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    )
  }

  hoverMouseLink () {
    let state = Object.assign({}, this.state);
    state.navBar.hover = true;
    this.setState(state);
  }

  leaveMouseLink () {
    let state = Object.assign({}, this.state);
    state.navBar.hover = false;
    this.setState(state);
  }

  oddEvent (match, location) {

    if (!match || this.state.navBar.hover) {
      return false
    }

    return true;
  }

}

export default RightBar;