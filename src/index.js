import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {routers} from 'base/routers';
import createStore from 'base/store/index';
import profile from 'users/profile/actions';
let store = createStore();

store.dispatch(profile.getInfo());

/*setInterval(() => {
  store.dispatch(profile.getInfo());
}, 180000);*/

render(
    <Provider store={store}>
      {routers}
    </Provider>
, document.querySelector('#root'));

if (process.env.NODE_ENV == 'development') {
  module.hot.accept()
}
