import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangePassword from './view';
import * as actionsChangePassword from './actions';


const mapStateToProps = state => {
  return {
    ...state.users.settings.changePassword,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionsChangePassword, dispatch),
    dispatch: param => dispatch(param)
  }
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(ChangePassword);
