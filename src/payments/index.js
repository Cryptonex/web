import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdvCash from './AdvCash';

function Payments(props) {
  const { match } = props;
  return(
    <div className="content">
      <Switch>
        <Route path={`${match.path}`} exact render={() => <Redirect to="/app/deposit" />}/>
        <Route path={`${match.path}/advcash`} component={AdvCash} />
      </Switch>
    </div>
  );
};

export default Payments;
