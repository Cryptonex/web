import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { translate } from "../base/settings";
import CheckCoupon from "./CheckCoupon";
import Authorization from 'main/containers/common/Authorization';
import CreateCoupon from './CreateCoupon';
import ActivateCoupon from './ActivateCoupon';
import ApplyCoupon from './ApplyCoupon'
import ListCoupon from './ListCoupon';

function Coupon(props) {
  const { match, profile } = props;
  
  return(
    <div className="content">
      <Switch>
        <Route path={match.path} exact component={CheckCoupon}/>
        <Route path={`${match.path}/create`} render={(props) => <Authorization route={props} WrappedComponent={CreateCoupon} auth />} />
        <Route path={`${match.path}/activate`} render={(props) => <Authorization route={props} WrappedComponent={ActivateCoupon} auth />} />
        <Route path={`${match.path}/apply`} render={(props) => <Authorization route={props} WrappedComponent={ApplyCoupon} auth />} />
        <Route path={`${match.path}/list`} render={(props) => <Authorization route={props} WrappedComponent={ListCoupon} auth />} />
      </Switch>
    </div>
  )
}

export default Coupon;
