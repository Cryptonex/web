if (process.env.NODE_ENV != 'development') {
  module.exports = require('./store.prod');
} else {
  module.exports = require('./store.dev');
}