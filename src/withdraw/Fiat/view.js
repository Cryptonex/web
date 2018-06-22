import React, { Component } from 'react';
import Input from '@antd/input';
import { translate } from "base/utils";
const TextArea = Input.TextArea;
import Select from '@antd/select';
const Option = Select.Option;
import Button from '@antd/button';
import InputNumber from '@antd/input-number'
import { parseNumber } from "../../base/utils";
import { SuccessAlert } from "../../main/components/common/Form";

class Fiat extends Component {
  render() {
    const { payment_systems, form, processing, updateField, currencies, withdraw, userInfo, successWithdraw} = this.props;
    return(
      <div className="col-md-9">
        <div className="default__info">

          <div className="row">
            <div className="col-md-12">
              <p style={{fontSize: '0.9rem', marginBottom: '20px'}}>{translate('page.fee')} 5% | {translate('form.amount-min')} =  1 EUR/USD || 10 RUB</p>
            </div>
            <div className="col-md-12 col-xs-12 col-sm-12">
              <label className="form-label">{translate('form.amount')}</label>
              <InputNumber parser={parseNumber} value={form.amount} onChange={value => updateField('amount', value)}/>
            </div>

            <div className="col-md-12 col-xs-12 col-sm-12">
              <label className="form-label">{translate('form.currency')}</label>
              <Select style={{width: '100%'}} value={form.currency} onChange={value => updateField('currency', value)} showSearch>
                {currencies.map(item => <Option key={item.currency} value={item.currency}>{item.currency.toUpperCase()}</Option>)}
              </Select>
            </div>

            {!form.currency ? null :
              <div className="col-md-12 col-xs-12 col-sm-12">
                <label className="form-label">{translate('form.payment-system')}</label>
                <Select style={{width: '100%'}} value={form.payment_system} onChange={value => updateField('payment_system', value)}>
                  {payment_systems.map(item => <Option key={item.payment_system} value={item.payment_system}>{item.alias}</Option>)}
                </Select>
              </div>
            }

            {form.payment_system.includes('advcash_email') ? <div className="col-md-12 col-xs-12 col-sm-12">
              <label className="form-label">{translate('form.email')}</label>
              <Input value={form.email} onChange={ev => updateField('email', ev.target.value)} />
            </div>: null}

            <div className="col-md-12 col-xs-12 col-sm-12">
              <label className="form-label">{translate('form.comment')}</label>
              <TextArea rows={5} value={form.note} onChange={ev => updateField('note', ev.target.value)}/>
            </div>
            { userInfo.auth_2fa ?
              <div className="col-md-12 col-xs-12 col-sm-12">
                <label className="form-label">{translate('form.enter_google_2fa_code')}</label>
                <input type="text" className="form form-full__width"
                       onChange={e => updateField('auth_2fa_code', e.target.value)}/>

              </div>: null }
          </div>

          {(successWithdraw && !userInfo.auth_2fa)  ? <SuccessAlert message='Check your e-mail for confirming of transaction.'/>: null}
          <div className="row row-right">
            <div className="col-md-0 col-sm-0 col-xs-0">
              <Button type="primary" loading={processing} onClick={withdraw}>{translate('action.send')}</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Fiat;