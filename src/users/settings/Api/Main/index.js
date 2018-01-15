import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Main from './view';
import * as actions from './actions';

const mapStateToProps = (state) => {
  return {
    ...state.users.settings.api.main
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(actions, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Main)
