import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {AppContainer} from 'react-hot-loader';

import {routers} from 'base/routers';
import store from 'base/store/index';

render(
    <Provider store={store()}>
      {routers}
    </Provider>
, document.querySelector('#root'));

if (process.env.NODE_ENV == 'development') {
  module.hot.accept()
}
