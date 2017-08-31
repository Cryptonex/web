import React, { Component } from 'react';
import { map } from 'underscore';
import Clipboard from 'clipboard';

class Referral extends Component {

  render() {
    const { profile } = this.props;
    return (
      <div className="referral">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="referral__info">
                <h5>Your referral link</h5>
                <div className="referral__info-action">
                  <p className="referral__info-text" >{`${document.location.origin}/users/registration/${profile.info.id}`}</p>
                  <input type="hidden" value={`${document.location.origin}/users/registration/${profile.info.id}`}
                         ref="ref_url"/>
                  <a className="referral__info-button" onClick={this.copyUrl.bind(this)}>Copy link</a>
                </div>
                <div className="referral__info-description">
                  Send a referral link to your friend and get 20% each time your friend buys CNX. The reward is automatically transferred only in case the purchase has been done via the backoffice. Be careful while sending a referral link! The Bounty Program is valid until CNX 90,000,000 will be released for free circulation. After that the purchase of CNX via the backoffice will be unavailable.
                </div>
              </div>
              <div>
                <ResponsiveTable columns={cols} rows={[]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  copyUrl(ev) {
    let urlField = this.refs['ref_url'];
    urlField.type='text';
    urlField.select();
    document.execCommand("Copy", false, null);
    urlField.type='hidden'
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
  amount: 'Amount (CNX)'
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


export default Referral;