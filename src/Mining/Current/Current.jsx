import React, { Component } from 'react';
import HighchartMore from 'highcharts-more';
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import {toFixed, translate} from "../../base/utils";
import moment from "moment/moment";
import Transactions from "../../transactions/view";
import {map} from "underscore";
import Pagination from '@/Pagination';
import Icon from '@antd/icon';
const Ind = <Icon type="loading" style={{ fontSize: 24 }} spin />;
import Spin from '@antd/spin';
HighchartMore(Highcharts);
import Alert from '@antd/alert';
import deepEqual from "fast-deep-equal";


class Current extends Component {

  componentDidMount(){
    const { loadTransactions, getInfoMining, loadDataChart } = this.props;
    loadTransactions();
    getInfoMining();
    setTimeout(() => loadDataChart(), 500)
  }

  componentWillReceiveProps(nextProps) {
    const { loading, errorLoadMining, loadTransactions, location, listChart, loadingChartData} = this.props;

    if (!deepEqual(location, nextProps.location)) {
      loadTransactions();
    }
  }

  componentWillUnmount(){
    this.divChart = undefined;
  }

  componentDidUpdate(prevProps) {
    const {listChart, loadingChartData} = this.props;

    if (this.divChart && (prevProps.loadingChartData && (loadingChartData !== prevProps.loadingChartData))) {
      this.renderChart(listChart);
    }
  }



  renderChart = (chartData) => {
    const { listChart } = this.props;
    this.chart = Highcharts.chart(this.divChart, {

      title: {
        text: ''
      },

      xAxis: {
        type: 'datetime'
      },

      yAxis: {
        title: {
          text: null
        }
      },

      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: ' CNX'
      },

      legend: {
      },

      series: [{
        name: 'Mining',
        data: chartData.list,
        zIndex: 0,
        type: 'spline',
        marker: {
          fillColor: 'white',
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[0]
        }
      },
/*        {
          name: 'Withdrawal',
          data: chartData.withdrawal,
          lineColor: 'red'
        }, {
          name: 'Deposit',
          data: chartData.deposit
        }*/
      ]
    });

    this.chart = true;
  };

  render() {
    const { listTransaction, pagination, loading, errorLoadMining, mining } = this.props;

    if (loading) {
      return(
        <div className="text-center">
          <Spin  spinning={loading} indicator={Ind}/>
        </div>
      )
    }

    if (errorLoadMining) {
      return(
        <div className="row row-center">
          <div className="col-md-6 col-sm-12 col-xs-12">
            <Alert
              message={<div className="text-center">Вклад не найден</div>}
              type="error"
            />
          </div>
        </div>
      )
    }

    const style = {
      height: '400px',
      width: '100%'
    };

    return(
      <div className="default__info">
        <div className="row row-grid">
          <div className="col-md-12">
            <h1 style={{margin: 0}}>{translate('mining.your_contribution_current')} {mining.amount} CNX</h1>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div><span>{translate('mining.hold_time')}: {mining.hold_expire_at ? mining.hold_expire_at: translate('mining.not_time')}</span></div>
            <div><span>{translate('mining.interest_rate')}: {mining.percent}%</span></div>
            <div><span>{translate('form.status')}: {mining.is_active ? translate('mining.active_mining'): translate('mining.not_active_mining')}</span></div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <h3>{translate('form.comment')}:</h3>
            <div><span>{mining.description}</span></div>
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div
              ref={ref => this.divChart = ref}
              id="chartdiv"
              style={style}
            ></div>
          </div>
        </div>

        <div className="row row-grid">
          <div className="transactions__table col-md-12">
            <h3>{translate('page.transactions')}</h3>
            <ResponsiveTable columns={cols} rows={listTransaction}/>
          </div>

          <div className="col-md-12 col-sm-12 col-xs-12">
            <Pagination pages={pagination.page_count} />
          </div>
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
      <tr>
        <th>{this.props.columns['update_stamp']}</th>
        <th>{this.props.columns['type']}</th>
        <th>{this.props.columns['from_hash']}</th>
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
          <td data-label="Type">
            <img src={require(`assets/images/${row['type']}.png`)}
                 className='type' title={row['type'] == 'deposit_referer' ? 'deposit referer' : row['type']}
                 alt={row['type']}/>
          </td>
          <td data-label="From">
            <p>{row['from_hash']}</p>
            <p>{toFixed(Math.round(row['from_amount']* 100000000) /100000000)} {row['from_currency'].toUpperCase()}</p>
            {row['order_uuid'] ? <Link to={`/app/p2p/orders/current/${row['order_uuid']}`} style={{color: '#27a2db'}}>{translate('form.order')}</Link>: null}
          </td>
          <td data-label="To">
            <p>{row['to_hash']}</p>
            <p>{toFixed(Math.round(row['to_amount']* 100000000) /100000000)} {row['to_currency'].toUpperCase()}</p>
            {row['order_uuid'] ? <Link to={`/app/p2p/orders/current/${row['order_uuid']}`} style={{color: '#27a2db'}}>{translate('form.order')}</Link>: null}
          </td>
          <td data-label="Status">
            {row['status'].indexOf('moderate') !== -1 ? returnTextStatus(row['status']): row['status']}
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
  to_hash: 'To',
  status: 'Status',
  update_stamp: 'Time',
  to_amount: 'Amount (CNX)'
};


function returnTextStatus(status) {
  if (status) {
    return translate(`statusTransaction.${status}`);
  }


  return translate(`statusTransaction.moderate`);
}


export default Current;