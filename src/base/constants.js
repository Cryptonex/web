import users from 'users/constants';
import transactions from 'transactions/constants';
import withdraw from 'withdraw/constants';
import referral from 'PrivateRef/constants';
import activations from 'activations/constants';
import replenishment from 'replenishment/constants';
import convert from 'convert/constants';
import exchange from 'exchange/constants';

export default Object.assign({
}, users, transactions, replenishment,
   withdraw, referral, activations, convert, exchange);

export const arrayRatio = [
  { type: 'sell_online', text: 'stable.sell_online' }, { type: 'buy_online', text: 'stable.buy_online'},
  { type: 'sell_offline', text: 'stable.sell_offline'}, { type: 'buy_offline', text: 'stable.buy_offline' }
];
