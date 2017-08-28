import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

import { ConnectedRouter} from 'react-router-redux';

import history from 'base/history';
import App from 'main/index';
import Transactions from 'transactions/view';
import Summary from 'summary/view'
import {routerUsers} from 'users/router';
import Replenishment from 'replenishment/index';


export let routers = (
  <ConnectedRouter history={history}>
    <main>
      <Route path='/' exact render={()=> <Redirect to='/users/'/>}/>
      <Route path='/app' component={App}/>
      {routerUsers}
    </main>
  </ConnectedRouter>
);


