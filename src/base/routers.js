import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

import { ConnectedRouter} from 'react-router-redux';

import history from 'base/history';
import App from 'main/index';
import {routerUsers} from 'users/router';


export let routers = (
  <ConnectedRouter history={history}>
    <main>
      <Route path='/' exact render={()=> <Redirect to='/app'/>}/>
      <Route path='/app' component={App}/>
      {routerUsers}
    </main>
  </ConnectedRouter>
);


