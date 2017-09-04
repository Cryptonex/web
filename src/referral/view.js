import React, { Component } from 'react';
import { map } from 'underscore';
import Clipboard from 'clipboard';
import moment from 'moment';
import Pagination from 'elements/pagination';
import Processing from 'elements/processing'

const dateOptions = [
  {name: 'All', value: ''}, {name:'Today', value: 'day'}, {name: 'This week', value: 'week'},
  {name: 'This month', value: 'month'}, {name: 'Last month', value: 'last_month'}, {name: 'This year', value: 'year'}
];

class Referral extends Component {
  componentDidMount() {
    const { getList, filter} = this.props;
    getList(filter);
  }
  render() {
    const { profile, updateFilter, filter, list, processing, updateList } = this.props;
    return (
      <div className="referral">

        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {processing ? <Processing />: null}
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
                <div className="row filter">
                  <div className="col-md-3">
                    <label className="form-label">Date</label>
                    <select className="form form-full__width"
                            onChange={e => updateFilter(filter, 'date', e.target.value)}>
                      {dateOptions.map((item, index) =>
                        <option value={item.value} key={index}>{item.name}</option>
                      )}
                    </select>
                  </div>
                </div>
                <ResponsiveTable columns={cols} rows={list}/>
                <div className="filter__pagination">
                  <Pagination pagination={this.props.pagination} update={(page)=> updateList(filter, page)}/>
                </div>
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
      <tr>
        <th>{this.props.columns['update_stamp']}</th>
        <th>{this.props.columns['to_hash']}</th>
        <th>{this.props.columns['status']}</th>
      </tr>
    );
  }

  rows() {
    const { rows, columns } = this.props;
    return  map(rows, function(row, index) {
      let localeTime = moment.utc(row['update_stamp']).toDate();
      localeTime = moment(localeTime).format('YYYY-MM-DD HH:mm:ss');
      return (
        <tr key={index}>
          <td data-label="Time">
            {localeTime}
          </td>
          <td data-label="To">
            <p>{Math.round(row['to_amount']* 100000000) /100000000} {row['to_currency']}</p>
          </td>
          <td data-label="Status">
            {row['status']}
          </td>

        </tr>
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
  from_hash: 'From',
  type: 'Type',
  from_amount: 'Amount',
  from_currency: 'Currency',
  to_hash: 'Amount',
  status: 'Status',
  update_stamp: 'Time',
  to_amount: 'Amount (CNX)'
};


export default Referral;