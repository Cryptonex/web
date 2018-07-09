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
import ModalDeposit from '../ModalDeposit';
import ModalWithdraw from '../ModalWithdraw';
import tr from "../../translation/tr";
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';

class ListMining extends Component {
  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  componentWillReceiveProps(nextProps) {
    const { location, getList, showModal, showModalWithdraw} = this.props;

    if (!deepEqual(location, nextProps.location)) {
      getList();
    }

    if (showModal && showModal !== nextProps.showModal) {
      getList();
    }

    if (showModalWithdraw && showModalWithdraw !== nextProps.showModalWithdraw) {
      getList();
    }
  }

  changeDepositId = (depositID) => {
    const { openModalDeposit } = this.props;
    openModalDeposit(depositID);
  };

  changeWithdrawId = (depositID) => {
    const { openModalWithdraw } = this.props;
    openModalWithdraw(depositID);
  };

  render() {
    const { list, processing, pagination, dispatch} = this.props;
    return(
      <div className="row row-grid">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <h1>{translate('mining.your_contribution')}</h1>
          <div className="spreadsheet spreadsheet-click-row">
            <Table
              columns={columns({changeDepositId: this.changeDepositId, changeWithdrawId: this.changeWithdrawId})}
              dataSource={list}
              pagination={false}
              loading={processing}
              rowKey="id"
              onRow={(record) => {
                return {
                  onClick: () => { dispatch(push(`/app/mining/list/${record.id}`))},       // click row
                };
              }}
            />
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <Pagination pages={pagination.page_count} />
            </div>
          </div>
        </div>
        <ModalDeposit />
        <ModalWithdraw />
      </div>
    )
  }
}

const columns = ({changeDepositId, changeWithdrawId}) => {
  return [
        {
      rowKey: 'id',
      render: item => {
        return <Link to={`/app/mining/list/${item.id}`} onClick={ev => ev.stopPropagation()} style={{color: '#27a2db'}}>#{item.id}</Link>
      }
    },
    {
      title: translate('form.date-created'),
      key: 'id',
      rowKey: 'id',
      render: item => {
        let localeTime = moment.utc(item.create_at).toDate();
        localeTime = moment(localeTime).format('YYYY-MM-DD HH:mm:ss');
        return localeTime;
      }
    },
    {
      title: translate('form.amount'),
      rowKey: 'id',
      render: item => {
        return `${item.amount} CNX`;
      }
    },
    {
      title: translate('form.status'),
      rowKey: 'id',
      render: item => {
        return item.is_active ? translate('mining.active_mining'): translate('mining.not_active_mining')
      }
    },
    {
      title: translate('mining.interest_rate'),
      rowKey: 'id',
      render: item => {
        return `${item.percent} %`
      }
    },
    {
      title: translate('form.comment'),
      rowKey: 'id',
      render: item => {
        return item.description.length > 20 ? `${item.description.substring(0,20)}...`: item.description
      }
    },
/*    {
      title: translate('mining.time_hold'),
      rowKey: 'id',
      render: item => {
        return item.hold_expire_at ? moment(item.hold_expire_at).format('YYYY-MM-DD HH:mm:ss'): ''
      }
    },*/
    {
      rowKey: 'id',
      render: item => {
        const disabled = item.hold_expire_at === '' ? false: moment().valueOf() < moment(item.hold_expire_at).valueOf();
        if (disabled) {
          return(
            <div>
              {translate('mining.frozen_until')} {moment(item.hold_expire_at).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          )
        }
        return (<div className="row row-between row-grid">
          <div className="col-md-0 col-sm-0 col-xs-0">
            <Button type='primary' onClick={ev => {ev.stopPropagation(); changeDepositId(item.id)}} disabled={item.hold_expire_at}>{translate('mining.income_contribution')}</Button>
          </div>
          <div className="col-md-0 col-sm-0 col-xs-0">
            <Button onClick={ev => {ev.stopPropagation(); changeWithdrawId(item.id)}} disabled={(disabled || item.amount == 0)}>{translate('form.withdraw')}</Button>
          </div>
        </div>)
      }
    },
  ]
};



export default ListMining;