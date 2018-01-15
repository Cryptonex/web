import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import Current from './view';


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(actions, dispatch)
  }
};

const mapStateToProps = (state) => {
  return {
    ...state.users.settings.api.current
  };
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(Current);
