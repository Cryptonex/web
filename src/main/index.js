import React, { Component } from 'react';
import TopMenu from './top-menu';

import {constants} from 'base/constants';
import RightBar from './right';
import style from 'styles/index';
import { Route, Switch, Redirect} from 'react-router-dom';
import Replenishment from 'replenishment/index';
import Transactions from 'transactions/index';


class App extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      couter: 1
    }
  }
  render() {
    const {match} = this.props;
    return (
      <div className="wrap-content">
        <TopMenu match={match}/>
        <Route path='/app/replenishment' component={Replenishment}/>
        <Route path='/app/transactions' component={Transactions}/>
      </div>
    );
  }

  updateCouter(ev) {
    let state = Object.assign({}, this.state);
    state.couter = state.couter + 1;
    this.setState(state);
  }
}



export default App;