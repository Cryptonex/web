import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateForm from './CreateForm';

function Adverts(props) {
  const { match } = props;
  return(
    <Switch>
      <Route path={match.path} exact render={() => <h1>list adverts</h1> } />
      <Route path={`${match.path}/create`} component={CreateForm} />
    </Switch>
  );
}

export default Adverts;
