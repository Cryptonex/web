import { connect } from 'react-redux';


import ChangePassword from './view';

const mapStateToProps = state => {
  return {
    ...state.users.settings.changePassword,
  }
};

export default connect(
  mapStateToProps, null
)(ChangePassword);