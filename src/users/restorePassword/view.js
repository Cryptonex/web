import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';


import Request from './components/request';
import Changer from './components/changer';

class RestorePassword extends Component {

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({type: 'USERS_RESTORE_PASSWORD_LEAVE_PAGE'});
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          <Switch>
            <Route path='/users/reset/password' exact render={() => <Request {...this.props}/>}/>
            <Route path='/users/reset/password/:key' render={(props) => <Changer {...this.props} match={props.match}/>} />
          </Switch>
        </div>
      </div>
    )
  }
}


export default RestorePassword;
