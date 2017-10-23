import 'whatwg-fetch';
// url api

const API_URL = 'https://webapi.cryptonex.org/api';
const API_TEST = 'http://dev-backoffice.cryptonex.internal/api';
const API = API_TEST;
const DOMAIN = 'cryptonex.org';

// google recaptch
export const KEY_RECAPTCH = "6Lf2mQ8UAAAAAHxT3TvPR2KMOYW2qS4g8j7qsLH8";

let idRequest = 0;

function getIdRequest() {
  let number = Math.floor(Math.random() * 10)+1;
  idRequest +=number;
  return idRequest;
};



function getDataArray(params) {

  return fetch(API, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

function getData(id, params, method) {

  let data = {
    'jsonrpc': '2.0',
    'method': method,
    'params': params,
    'id': id,
  };
  
  return fetch(API, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


function getUrlParams(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


let checkValidClientId = (id) => {
  let numbers = id.split('');
  let status = true;
  numbers = numbers.map((item) => {
    if (!isNumeric(item)) {
      status = false;
    }
    return Number(item);
  });

  if (!status) return status;

  let sum = numbers.slice(0,8).reduce((sum, item) => {
    return sum + item;
  });

  if (sum == numbers.slice(8).join('')) return true;

  return false;

};

export {
  getData, getDataArray, getIdRequest, getUrlParams, DOMAIN, checkValidClientId
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
