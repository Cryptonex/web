import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

export const EE = emitter;

export const modalEmitter = {
  add: content => emitter.emit('create/modal', content),
  remove: id => emitter.emit('close/modal', id),
  clear: () => emitter.emit('close/all')
};