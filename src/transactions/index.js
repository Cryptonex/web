import { connect } from 'react-redux';

import Transactions from './view';
import transactions from './actions';


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: params => dispatch(params),
    getList: filter => dispatch(transactions.getList(filter)),
    updateFilter: (filter, field, value) =>
      dispatch(transactions.updateFilter(filter, field, value)),
    updateList: (filter, page) =>
      dispatch(transactions.updateList(filter, page)),
  }
};

const mapStateToProps = (state) => {
  return {
    pagination: state.transactions.pagination,
    filter: state.transactions.filter,
    processing: state.transactions.processing
  }
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(Transactions);