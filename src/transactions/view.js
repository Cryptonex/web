import React, { Component } from 'react';

import { map } from 'underscore';
import Pagination from 'elements/pagination';

const statusOptions = [
  {name: 'All', value: ''}, {name: 'Created', value: 'created'}, {name: 'Moderated', value: 'moderated'},
  {name: 'Unconfirmed', value: 'unconfirmed'}, {name: 'Confirmed', value: 'confirmed'}
];

const dateOptions = [
  {name: 'All', value: ''}, {name:'Today', value: 'day'}, {name: 'This week', value: 'week'},
  {name: 'This month', value: 'month'}, {name: 'This year', value: 'year'}
]

class Transactions extends Component {
  componentDidMount() {
    const { getList, filter} = this.props;
    getList(filter);
  }

  render() {
    const { updateFilter } = this.props;
    return (
      <div className="transactions">
        <div className="container">
          <div className="row filter">
            <div className="col-md-3">
              <label className="form-label">Date</label>
              <select className="form form-full__width">
                {dateOptions.map((item, index) =>
                  <option value={item.value} key={index}>{item.name}</option>
                )}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select className="form form-full__width">
                {statusOptions.map((item, index) =>
                  <option value={item.value} key={index}>{item.name}</option>
                )}
              </select>
            </div>
          </div>
          <div className="row pagination">
            <div className="col-md-7">
              <div className="filter__pagination">
                <Pagination pagination={this.props.pagination} update={(page)=> console.log(page)}/>
              </div>
            </div>
          </div>
          <ResponsiveTable columns={cols} rows={rows}/>
        </div>

      </div>
    )
  }
}



class ResponsiveTable extends Component {
  head() {
    let columns = map(this.props.columns, (colName, index) => {
      return (
        <th key={index}>{colName}</th>
      );
    });
    return (
      <tr>{columns}</tr>
    );
  }

  rows() {
    const { rows, columns } = this.props;
    return  map(rows, function(row, index) {
      let values = map(columns, (colName, colKey) =>
        <td data-label={colName} key={colKey}>{row[colKey]}</td>
      );
      return (
        <tr key={index}>{values}</tr>
      );
    })
  }

  render() {
    return (
      <table className="responsive-table">
        <thead>
        {this.head()}
        </thead>
        <tbody>
        {this.rows()}
        </tbody>
      </table>
    );
  }
};

let cols = {
  transaction: 'Transaction',
  address: 'Address',
  status: 'Status',
  date: 'Date',
  amount: 'Amount(CNX)'
};

let rows = [
  {
  transaction: '1',
  address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
  status: 'Status',
  date: '27.12.2017',
  amount: '50'
  },{
    transaction: '2',
    address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
    status: 'Status',
    date: '27.12.2017',
    amount: '27'
  },{
    transaction: '3',
    address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
    status: 'Status',
    date: '27.12.2017',
    amount: '37'
  },
  {
    transaction: '4',
    address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
    status: 'Status',
    date: '27.12.2017',
    amount: '37'
  },{
    transaction: '5',
    address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
    status: 'Status',
    date: '27.12.2017',
    amount: '37'
  },{
    transaction: '6',
    address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
    status: 'Status',
    date: '27.12.2017',
    amount: '37'
  },{
    transaction: '7',
    address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
    status: 'Status',
    date: '27.12.2017',
    amount: '37'
  },{
    transaction: '8',
    address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
    status: 'Status',
    date: '27.12.2017',
    amount: '37'
  },{
    transaction: '9',
    address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
    status: 'Status',
    date: '27.12.2017',
    amount: '37'
  },{
    transaction: '10',
    address: 'GYctgrcpDVBQ9q5TJC2nnPyV9n3892xdY1',
    status: 'Status',
    date: '27.12.2017',
    amount: '37'
  },
];

export default Transactions;