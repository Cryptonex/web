import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Transactions from './view';
import * as transactions from './actions';


const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(transactions, dispatch),
    dispatch: params => dispatch(params),
  }
};

const mapStateToProps = (state) => {
  return {
    pagination: state.transactions.pagination,
    filter: state.transactions.filter,
    processing: state.transactions.processing,
    list: state.transactions.list
  }
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(Transactions);