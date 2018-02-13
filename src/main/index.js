import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux'
import * as actionsProfile from 'users/profile/actions';
import { bindActionCreators } from 'redux';
import Alerts from 'elements/alerts/index';

import style from 'styles/index';
import Header from './header';
import Sidebar from './sidebar';
import Breadcrumbs from './breadcrumbs';
import Processing from 'elements/processing';
import PrivateRef from 'PrivateRef';


import Replenishment from 'replenishment/index';
import Transactions from 'transactions/index';
import Withdraw from 'withdraw/index';
import Referral from 'referral/index';
import Settings from 'users/settings/index';
import Exchange from 'exchange';
import Payments from 'payments';
import P2P from 'components/P2P';

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actionsProfile, dispatch),
    dispatch: params => dispatch(params),
  }
};

const mapStateToProps = (state) => {
  return {
    profile: state.users.profile.current,
    processingStartApp: state.users.profile.processingStartApp,
    walletCnx: state.users.profile.walletCnx,
    wallets: state.users.profile.wallets
  }
};




class App extends Component {
  componentDidMount() {
    const { profile, processingStartApp, dispatch, match } = this.props;
    if (!processingStartApp.info && !profile.is_active) {
      return dispatch(replace('/users'))
    }
  }

  componentDidUpdate() {
    const { profile, processingStartApp, dispatch } = this.props;

    if (!processingStartApp.info && !profile.is_active) {
      return dispatch(replace('/users'))
    }
  }

  render() {
    const { match, profile, processingStartApp, logout, walletCnx, wallets} = this.props;

    if (processingStartApp.info || processingStartApp.wallets || processingStartApp.rates) {
      return (
        <div className="wrap-content">
          <Processing/>
        </div>
      )
    }

    if (wallets.length < 3) {
      return (
        <div className="wrapper" style={{justifyContent: 'center'}}>
          <div className="content">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="default__info" style={{textAlign: 'center'}}>
                  <h5>Wallets are being created.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <Header logout={logout} wallets={wallets} profile={profile}/>
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
                  <Switch>
                    <Route path='/app' exact render={() => <Redirect to='/app/deposit'/>}/>
                    <Route path='/app/p2p' component={P2P} />
                    <Route path='/app/deposit' component={Replenishment}/>
                    <Route path='/app/private/ref' component={PrivateRef} />
                    <Route path='/app/transactions' component={Transactions}/>
                    <Route path='/app/withdraw' component={Withdraw}/>
                    {/*<Route path='/app/referral' component={Referral}/>*/}
                    <Route path='/app/settings'  component={Settings}/>
                    <Route path='/app/exchange' component={Exchange}/>
                    <Route path='/app/payments' component={Payments} />
                    <Route render={() => <Redirect to='/app/deposit'/>}/>
                  </Switch>
                </div>
              </div>
            </main>
          </div>
          <Alerts />
        </div>

        <div className="row row-center">
          <div className="copyright" style={{textAlign: 'center', fontSize: '0.9rem'}}>
            <p>2017-2018 &copy; Cryptonex LP, UTR 1326380974, 101, Rose Street South Lane, Edinburgh, EH23JG, Scotland, UK.</p>
          </div>
        </div>
      </div>
    );
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
