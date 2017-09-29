import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';


import Popup from './view';
import * as actionsModal from './actions';
import { modalEmitter } from './emitter';
import modalView from './modal';

const mapStateToProps = state => {
  return {
    popups: state.popups
  }
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionsModal, dispatch),
  }
};

export const modalActions = actionsModal;
export const modal = modalEmitter;
export const ModalContent = modalView;

export default connect(
  mapStateToProps, mapDispatchToProps
)(Popup);

