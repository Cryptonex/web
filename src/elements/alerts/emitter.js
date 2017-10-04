import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

export const EE = emitter;

export const alertEmitter = {
  info: (message, lifetime) => emitter.emit('create/alert_info', {message, lifetime}),
  warning: (message, lifetime) => emitter.emit('create/alert_warning', {message, lifetime}),
  success: (message, lifetime) => emitter.emit('create/alert_success', {message, lifetime}),
  danger: (message, lifetime) => emitter.emit('create/alert_danger', {message, lifetime}),
  close: id => emitter.emit('close/alert', id),
  closeAll: () => emitter.emit('close/alert_all'),
};