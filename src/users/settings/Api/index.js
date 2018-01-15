import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './Main';
import Current from './Current';

function Api(props) {
  const { match } = props;
  return(
    <div className="content">
      <Switch>
        <Route path={`${match.path}`} exact component={Main} />
        <Route path={`${match.path}/:apiId`} component={Current}/>
      </Switch>
    </div>
  );
}

export default Api;
