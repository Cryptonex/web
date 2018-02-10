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
    const { getList, filter, loadInfoRef} = this.props;
    getList(filter);
    loadInfoRef()
  }
  render() {
    const { profile, updateFilter, filter, list, processing, updateList, refInfo} = this.props;
    return (
      <div className="content referral">

        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {processing ? <Processing />: null}

              <div>
                <h5>Private referral system</h5>
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <p>Number of registered users: {refInfo.user_total}</p>
                    <p>Received CNX: {refInfo.sum}</p>
                  </div>
                </div>
                <div className="row filter">
{/*                  <div className="col-md-3">
                    <label className="form-label">Date</label>
                    <select className="form form-full__width"
                            onChange={e => updateFilter(filter, 'date', e.target.value)}>
                      {dateOptions.map((item, index) =>
                        <option value={item.value} key={index}>{item.name}</option>
                      )}
                    </select>
                  </div>*/}
                </div>
                <h3>Transactions</h3>
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
