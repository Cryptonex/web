import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Security from './view';
import Api from './Api';

function Settings(props){
  return(
    <Switch>
      <Route exact path="/app/settings" render={(props) => <Redirect to="/app/settings/security"/>}/>
      <Route path="/app/settings/security" component={Security} />
      <Route path="/app/settings/api" render={Api} />
    </Switch>
  );
};

export default Settings;
