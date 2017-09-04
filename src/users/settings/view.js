import React, { Component } from 'react';

import TwoFa from './2fa/index';

class Settings extends Component {
  render() {
    return (
      <div className="settings">
        <div className="container">
          <TwoFa />
        </div>
      </div>
    )
  }
}


export default Settings;