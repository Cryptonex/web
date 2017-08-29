import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

const mapStateToProps = (state) => {
  return {
    profile: state.users.profile.current
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: params => dispatch(params),
  }
};


class Users extends Component {
  componentDidUpdate() {
    const { profile, dispatch } = this.props;
    if (profile.is_active) {
      return dispatch(push('/app'));
    }
  }

  render() {
    return (
      <div className="users">
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);