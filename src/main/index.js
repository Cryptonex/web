import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import * as actionsProfile from 'users/profile/actions';
import { bindActionCreators } from 'redux';


import style from 'styles/index';
import TopMenu from './top-menu';
import Processing from 'elements/processing';



import Replenishment from 'replenishment/index';
import Transactions from 'transactions/index';
import Withdraw from 'withdraw/index';
import Referral from 'referral/index';

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
    wallets: state.users.profile.wallets,
  }
};




class App extends Component {
  componentDidMount() {
    const { profile, processingStartApp, dispatch } = this.props;

    if (!processingStartApp.info && !profile.is_active) {
      return dispatch(push('/users'))
    }
  }

  componentDidUpdate() {
    const { profile, processingStartApp, dispatch } = this.props;

    if (!processingStartApp.info && !profile.is_active) {
      return dispatch(push('/users'))
    }
  }

  render() {
    const { match, profile, processingStartApp, logout, wallets} = this.props;

    if (processingStartApp.info || processingStartApp.wallets) {
      return (
        <div className="wrap-content">
          <Processing/>
        </div>
      )
    }

    const walletCNX = wallets.filter((item, index) => item.currency == "cryptonex")[0];

    return (
      <div className="wrap-content">
        <TopMenu match={match} logout={logout} profile={profile} walletCNX={walletCNX}/>
        <div className="content">
          <Route path='/app' exact render={() => <Redirect to='/app/deposit'/>}/>
          <Route path='/app/deposit' component={Replenishment}/>
          <Route path='/app/transactions' component={Transactions}/>
          <Route path='/app/withdraw' component={Withdraw}/>
          <Route path='/app/referral' component={Referral}/>
        </div>
        <div className="footer">
          <div className="container">
            <div style={{borderBottom: '1px solid #dddddd', margin: '30px 0'}}></div>
          </div>
          <p>2017 © Cryptonex ltd. All Rights Reserved</p>
        </div>
      </div>
    );
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(App);