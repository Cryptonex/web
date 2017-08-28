import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';

class Users extends Component {
  render() {
    return (
      <div className="users">
        {this.props.children}
      </div>
    )
  }
}

export default Users;