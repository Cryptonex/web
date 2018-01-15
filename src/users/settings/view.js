import React, { Component } from 'react';
import { connect } from 'react-redux';
import TwoFa from './2fa/index';
import ChangePassword from './changePassword/index'

class Settings extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'USERS_SETTINGS_LEAVE_PAGE'})
  }

  render() {
    return (
      <div className="settings content">
        <div className="container">
          <div className="row">
            <TwoFa />
            <ChangePassword />
          </div>
        </div>
      </div>
    )
  }
}


export default connect(null, null)(Settings);
