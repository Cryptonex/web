import constants from './constants';

export let add = (type, message, lifetime) => {
  const id = Math.random().toString(16).split('.')[1];

  return { type: constants.INSERT_ALERT, payload: { id, type, message, lifetime } };
};

export let close = (id) =>  {
  return { type: constants.REMOVE_ALERT, payload: { id } };
};

export let closeAll = () => {
  return { type: constants.REMOVE_ALL_ALERT }
};