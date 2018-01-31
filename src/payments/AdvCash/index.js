import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Error from './Error';
import Success from './Success';

function AdvCash(props) {
  const { match } = props;
  return(
    <Switch>
      <Route path={`${match.path}`} exact render={() => <Redirect to="/app/deposit" />}/>
      <Route path={`${match.path}/success`} component={Success} />
      <Route path={`${match.path}/error`} component={Error} />
    </Switch>
  );
};

export default AdvCash;
