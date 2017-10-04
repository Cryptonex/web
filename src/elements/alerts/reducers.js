import constants from './constants';
import update from 'react-addons-update';

export default (state=[], action) => {
  switch (action.type) {
    case constants.INSERT_ALERT:
      return update(state, {
        $push: [action.payload]
      });
    case constants.REMOVE_ALERT:
      let index = state.findIndex((alert) => alert.id == action.payload.id);
      return update(state, {
        $splice: [[index, 1]]
      });
    case constants.REMOVE_ALL_ALERT:
      return [];
    default:
      return state
  }
};