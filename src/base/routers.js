import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

import { ConnectedRouter} from 'react-router-redux';

import history from 'base/history';
import App from 'main/index';
import {routerUsers} from 'users/router';
import ActivationTransaction from 'activations/transaction/index';


export let routers = (
  <ConnectedRouter history={history}>
    <main>
      <Route path='/' exact render={()=> <Redirect to='/app'/>}/>
      <Route path='/app' component={App}/>
      <Route path="/transaction/confirm/:code" component={ActivationTransaction}/>
      {routerUsers}
    </main>
  </ConnectedRouter>
);


