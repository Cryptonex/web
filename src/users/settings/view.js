import React, { Component } from 'react';

import TwoFa from './2fa/index';
import ChangePassword from './changePassword/index'

class Settings extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'USERS_SETTINGS_LEAVE_PAGE'})
  }
  render() {
    return (
      <div className="settings">
        <div className="container">
          <TwoFa />
          <ChangePassword />
        </div>
      </div>
    )
  }
}


export default Settings;