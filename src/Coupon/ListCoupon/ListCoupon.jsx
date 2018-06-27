import React, { Component } from 'react';
import { translate } from "../../base/settings";
import Input from '@antd/input';
import Button from '@antd/button';
import QrReader from 'react-qr-reader';
import Alert from '@antd/alert';
import PropTypes from 'prop-types';
import Table from '@antd/table';
import Icon from '@antd/icon';
const Ind = <Icon type="loading" style={{ fontSize: 24 }} spin />;
import Pagination from '@/Pagination';
import moment from 'moment';
import deepEqual from "fast-deep-equal";

class ListCoupon extends Component {

  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  componentWillReceiveProps(nextProps) {
    const { location, getList} = this.props;

    if (!deepEqual(location, nextProps.location)) {
      getList();
    }
  }
  
  render() {
    const { list, processing, pagination } = this.props;
    return(
      <div className="row row-grid">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="spreadsheet">
            <Table 
              columns={columns()}
              dataSource={list}
              pagination={false}
              loading={processing}
              rowKey="code" />
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <Pagination pages={pagination.page_count} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const columns = () => {
  return [
    {
      title: translate('form.type'),
      dataIndex: 'type',
      rowKey: 'code',
      render: type => translate(`coupon.types.${type}`)
    },
    {
      title: translate('coupon.coupon'),
      dataIndex: 'code',
      rowKey: 'code',
    },
    {
      title: translate('form.password'),
      dataIndex: 'password',
      rowKey: 'code',
      render: (pass) => pass ? '+': '-',
    },
    {
      title: translate('coupon.receiver'),
      dataIndex: 'receiver',
      rowKey: 'code',
    },
    {
      title: translate('coupon.time_of_redeem'),
      dataIndex: 'redeem_at',
      rowKey: 'code',
      render: (time) => time ? moment(time).format('YYYY-MM-DD HH:mm:ss'): null,
    },
    {
      title: translate('form.status'),
      dataIndex: 'status',
      rowKey: 'code',
      render: status => translate(`coupon.status.${status}`)
    },
/*    {
      title: translate('coupon.time_of_action'),
      dataIndex: 'expire_at',
      rowKey: 'code',
    }*/
  ]
};

export default ListCoupon;