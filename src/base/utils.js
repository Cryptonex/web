import { I18n } from 'react-redux-i18n';
import ReactHtmlParser from 'react-html-parser';



const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

export const generateArrayConst = (constant) => {
  return [constant, `${constant}_${ERROR}`, `${constant}_${SUCCESS}`];
};

export const translate = (text='', params={}, inner=false) => {
  if (inner) {
    return ReactHtmlParser(I18n.t(text, params));
  }

  return I18n.t(text, params);
};


export const parseNumber = (stringValue) => {
  return stringValue.replace(/,/, ".");
};
