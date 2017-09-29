import constants from './constants';

export let create = (content) => {
  const id = Math.random().toString(16).split('.')[1];

  return { type: constants.INSERT_POPUP, payload: { id, content} };

};

export let close = id =>  {
  return { type: constants.REMOVE_POPUP, payload: { id } };
};

export let closeAll = () => {
  return { type: constants.REMOVE_POPUP_ALL };
};