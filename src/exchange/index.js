import { connect, connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import Exchange from './view';
import deepEqual from 'fast-deep-equal';
import * as actionsExchange from './actions';
import constants from 'base/constants';




function selectorFactory(dispatch) {
  let state = {};
  let ownProps = {};
  let result = {};

  const actions = bindActionCreators(actionsExchange, dispatch);

  const updateInput = (field, value) =>  {
    const rate = result.rate;

    if (field === 'amount') {
      const valueToAmount = Math.round((value * rate - (value * rate) * 0.1) * 100000000) / 100000000; // hard 0.1% fee
      dispatch({
        type: constants.EXCHANGE_UPDATE_INPUTS,
        payload: {
          amount: value,
          to_amount: valueToAmount
        }
      });
    }

    if (field === 'to_amount') {
      const valueAmount = Math.round((value / rate + (value / rate)*0.1) * 100000000) / 100000000; // hard 0.1% fee
      dispatch({
        type: constants.EXCHANGE_UPDATE_INPUTS,
        payload: {
          amount: valueAmount,
          to_amount: value
        }
      });
    }
  };

  const submitForm = (ev) => {
    ev.preventDefault();
    const { wallets } = state.users.profile;
    const { form } = result;
    actions.submitForm(form, wallets);
  };

  const updateSelect = (field, value) => {
    if (field === 'from_currency' && value !== 'cnx') {
      dispatch({
        type: constants.EXCHANGE_UPDATE_SELECTS,
        payload: {
          [field]: value,
          to_currency: 'cnx'
        }
      });
    }

    if (field === 'from_currency' && value === 'cnx') {
      dispatch({
        type: constants.EXCHANGE_UPDATE_SELECTS,
        payload: {
          [field]: value,
          to_currency: 'btc'
        }
      });
    }

    if (field === 'to_currency' && value !== 'cnx') {
      dispatch({
        type: constants.EXCHANGE_UPDATE_SELECTS,
        payload: {
          [field]: value,
          from_currency: 'cnx'
        }
      });
    }

  };


  return (nextState, nextOwnProps) => {
    const { form,  processing, charts } = nextState.exchange,
      { rates, currencies } = nextState.users.profile;

    const relRates = rates.map(item => item.rel_currency_id);

    const toCurrencies = currencies.filter(item => {
      if (form.from_currency === 'cnx') {
        return item.currency !== 'cnx' && relRates.includes(item.currency);
      }

      return item.currency === 'cnx';
    });

    const currentRate = rates.filter((item) =>
      (item.base_currency === form.from_currency && item.rel_currency_id === form.to_currency) ||
      (item.rel_currency_id === form.from_currency && item.base_currency === form.to_currency))[0];

    let rate = form.from_currency !== 'cnx' ? 1 / Number(currentRate.ask): Number(currentRate.bid);


    const nextResult = {
      dispatch,
      submitForm,
      updateInput,
      updateSelect,
      currentRate,
      rates,
      form,
      loadDataChart: actions.loadDataChart,
      fromCurrencies: currencies.filter(item => relRates.includes(item.currency) || item.currency === 'cnx'),
      rate,
      toCurrencies,
      processing, charts,
      ...nextOwnProps
    };


    ownProps = nextOwnProps;
    state = nextState;

    if (!deepEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  }
}

export default connectAdvanced(selectorFactory)(Exchange);
