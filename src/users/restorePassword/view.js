import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';


import Request from './components/request';
import Changer from './components/changer';

class RestorePassword extends Component {
  render() {
    const { form, submitRequest, error, dispatch, updateForm}  = this.props;
    return (
      <div className="container">
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