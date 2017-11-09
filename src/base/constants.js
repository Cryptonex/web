import users from 'users/constants';
import transactions from 'transactions/constants';
import withdraw from 'withdraw/constants';
import referral from 'referral/constants';
import activations from 'activations/constants';
import replenishment from 'replenishment/constants';
import convert from 'convert/constants';

export default Object.assign({
}, users, transactions, replenishment,
   withdraw, referral, activations, convert);

