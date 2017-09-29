import constants from './constants';
import update from 'react-addons-update';


const popups = (state = [], action) => {
  switch (action.type) {
    case constants.INSERT_POPUP:
      return update(state, {
        $push: [action.payload]
      });
    case constants.REMOVE_POPUP:
      let index = state.findIndex((view) => view.id == action.payload.id);
      return update(state, {
        $splice: [[index, 1]]
      });
    case constants.REMOVE_POPUP_ALL:
      return [];
    default:
      return state
  }
};



export default popups;