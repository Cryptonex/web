import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import style from 'styles/index';
import TopMenu from './top-menu';
import Processing from 'elements/processing';



import Replenishment from 'replenishment/index';
import Transactions from 'transactions/index';
import Withdraw from 'withdraw/index';


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: params => dispatch(params),
  }
};

const mapStateToProps = (state) => {
  return {
    profile: state.users.profile.current,
    processingStartApp: state.users.profile.processingStartApp,
  }
};




class App extends Component {
  componentDidUpdate() {
    const { profile, processingStartApp, dispatch } = this.props;

    if (!processingStartApp && !profile.is_active) {
      return dispatch(push('/users'))
    }
  }

  render() {
    const { match, profile, processingStartApp } = this.props;

    if (processingStartApp) {
      return (
        <div className="wrap-content">
          <Processing/>
        </div>
      )
    }

    return (
      <div className="wrap-content">
        <TopMenu match={match}/>
        <Route path='/app' exact render={() => <Redirect to='/app/replenishment'/>}/>
        <Route path='/app/replenishment' component={Replenishment}/>
        <Route path='/app/transactions' component={Transactions}/>
        <Route path='/app/withdraw' component={Withdraw}/>
      </div>
    );
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(App);