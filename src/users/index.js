import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'


import Registration from './registration/index';
import Login from './login/index';
import Activation from './activation/index';
import Header from 'main/header';
import Sidebar from 'main/sidebar';
import Breadcrumbs from 'main/breadcrumbs';

const mapStateToProps = (state) => {
  return {
    profile: state.users.profile.current,
    walletCnx: state.users.profile.walletCnx,
    wallets: state.users.profile.wallets
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
    const { profile, walletCnx, wallets } = this.props;
    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <Header profile={profile} wallets={wallets}/>
          </div>
        </div>

        <div className="row row-inline">
          <div className="col-xs-0 col-sm-0 mobile-collapse">
            <Sidebar />
          </div>

          <div className="col-xs-auto col-sm-auto">
            <main className="workspace">
              <div className="row">
                <div className="col-xs-12 col-sm-12">
                  <Breadcrumbs />
                </div>
              </div>

              <div className="row row-auto">
                <div className="col-xs-12 col-sm-12">
                  {this.props.children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
