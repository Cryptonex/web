import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Adverts from './Adverts';

function P2P(props) {
  const { match } = props;
  return(
    <div className="content">
      <Switch>
        <Route path={match.path} exact render={() => <Redirect to={`${match.path}/adverts`}/> } />
        <Route path={`${match.path}/adverts`} component={Adverts} />
      </Switch>
    </div>
  )
}

export default P2P;
