import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateForm from './Create';
import List from './List';
import Current from './Current';

function Mining(props) {
  const { match, profile } = props;

  return(
    <div className="content">
      <Switch>
        <Route path={match.path} exact component={CreateForm}/>
        <Route path={`${match.path}/list`} exact component={List}/>
        <Route path={`${match.path}/list/:mining_id`} component={Current}/>
      </Switch>
    </div>
  )
}

export default Mining;