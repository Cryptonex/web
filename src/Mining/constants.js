import create from './Create/constants';
import list from './List/constants';
import modalDeposit from './ModalDeposit/constants';
import modalWithdraw from './ModalWithdraw/constants';
import current from './Current/constants';

export default {
  ...modalWithdraw,
  ...modalDeposit,
  ...create,
  ...list,
  ...current
};