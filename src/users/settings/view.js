import React, { Component } from 'react';

import TwoFa from './2fa/index';
import ChangePassword from './changePassword/index'

class Settings extends Component {
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