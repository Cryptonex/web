import { combineReducers } from 'redux';
import create from './Create/reducers';
import list from './List/reducers';
import modalDeposit from './ModalDeposit/reducers';
import modalWithdraw from './ModalWithdraw/reducers';
import current from './Current/reducers';

export default combineReducers({
  create,
  list,
  modalDeposit,
  modalWithdraw,
  current
});