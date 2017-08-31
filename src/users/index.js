import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import TopMenu from 'main/top-menu';

import Registration from './registration/index';
import Login from './login/index';
import Activation from './activation/index';


const mapStateToProps = (state) => {
  return {
    profile: state.users.profile.current
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: params => dispatch(params),
  }
};


class Users extends Component {

  componentDidMount() {
    const { profile, processingStartApp, dispatch } = this.props;

    if (profile.is_active) {
      return dispatch(push('/app'))
    }
  }

  componentDidUpdate() {
    const { profile, dispatch } = this.props;
    if (profile.is_active) {
      return dispatch(push('/app'));
    }
  }

  render() {
    const { profile, processingStartApp, dispatch } = this.props;
    return (
      <div className="users">
        <TopMenu profile={profile}/>
        <div className="content">
          {this.props.children}
        </div>
        <div className="footer">
          <div className="container">
            <div style={{borderBottom: '1px solid #dddddd', margin: '30px 0'}}></div>
          </div>
          <p>2017 © Cryptonex ltd. All Rights Reserved</p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);