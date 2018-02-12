import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {routers} from 'base/routers';
import createStore from 'base/store/index';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import  * as actionsProfile  from 'users/profile/actions';
import Cookies from 'js-cookie';
import translation from './translation';

let cookiesTicket = Cookies.get('ticket');

if (cookiesTicket) {
  localStorage.setItem('ticket', cookiesTicket);
  document.cookie = 'ticket' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.cryptonex.org";
}

export let store = createStore();

store.dispatch(actionsProfile.getInfo());
store.dispatch(actionsProfile.loadlListCurrency());

/// settings translation
let lang = JSON.parse(localStorage.getItem('lang'));

if (lang === null || typeof lang !== 'object') {
  lang =  { name: 'English', code: 'en-UK' };
  localStorage.setItem('lang', JSON.stringify(lang));
}

syncTranslationWithStore(store);
store.dispatch(setLocale(lang.code));
store.dispatch(loadTranslations({ [lang.code]: translation[lang.code] || translation['en-UK']}));
///


setInterval(function() {
  store.dispatch(actionsProfile.getInfo());
  store.dispatch(actionsProfile.fetchRates());
}, 30000);

render(
    <Provider store={store}>
      {routers}
    </Provider>
, document.querySelector('#root'));

if (process.env.NODE_ENV == 'development') {
  module.hot.accept()
}
