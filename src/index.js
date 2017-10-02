import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {routers} from 'base/routers';
import createStore from 'base/store/index';

import  * as actionsProfile  from 'users/profile/actions';
import Cookies from 'js-cookie';

let cookiesTicket = Cookies.get('ticket');

if (cookiesTicket) {
  localStorage.setItem('ticket', cookiesTicket);
  document.cookie = 'ticket' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.cryptonex.org";
}

export let store = createStore();

store.dispatch(actionsProfile.getInfo());

setInterval(function() {
  store.dispatch(actionsProfile.getInfo());
}, 30000);

render(
    <Provider store={store}>
      {routers}
    </Provider>
, document.querySelector('#root'));

if (process.env.NODE_ENV == 'development') {
  module.hot.accept()
}
