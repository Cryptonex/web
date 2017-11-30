import { createSelector } from 'reselect';

const userInfo = state => state.users.profile.current.info;
const rates = state => state.users.profile.rates;
const wallets = state => state.users.profile.wallets;

const userInfoSelector = createSelector(
  userInfo,
  rates,
  wallets,
  (userInfo, rates, wallets) => { return {
    userInfo,
    rates,
    wallets
  } },
);

const ratesSelector = createSelector(
  rates,
  rates => {
    return [...rates];
  }
);

const walletsSelector = createSelector(
  wallets,
  wallets => [...wallets]
);


export {
  userInfoSelector,
  ratesSelector,
  walletsSelector
};
