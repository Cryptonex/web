import { combineReducers } from 'redux';
import checkCoupon from './CheckCoupon/reducers';
import createCoupon from './CreateCoupon/reducers';
import activateCoupon from './ActivateCoupon/reducers';
import applyCoupon from './ApplyCoupon/reducers';
import listCoupon from './ListCoupon/reducers';

export default combineReducers({
  checkCoupon,
  createCoupon,
  activateCoupon,
  applyCoupon,
  listCoupon,
});