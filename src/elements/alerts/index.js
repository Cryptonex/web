import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Alerts from './view';
import * as actionsAlerts from './actions';
import { alertEmitter } from './emitter';

const mapStateToProps = state => {
  return {
    list: state.alerts
  }
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionsAlerts, dispatch)
  }
};


export const alertActions = actionsAlerts;
export const alert = alertEmitter;

export default connect(
  mapStateToProps, mapDispatchToProps
)(Alerts)