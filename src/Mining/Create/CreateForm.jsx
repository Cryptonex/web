import React, { Component } from 'react';
import { translate } from "../../base/utils";
import InputNumber from '@antd/input-number';
import { parseNumber } from "../../base/utils";
import Input from '@antd/input';
const TextArea = Input.TextArea;
import Button from '@antd/button';
import { Validation } from "../../main/components/common/Form";
import Checkbox from '@antd/checkbox';
import { toFixed } from "../../base/utils";
import Select from '@antd/select';
const Option = Select.Option;

class CreateForm extends Component {

  componentDidMount() {
    const { loadPool } = this.props;
    loadPool();
  }

  render() {

    const { form, updateField, validateDate, creatingMining, processingCreate, miningPool } = this.props;
    const percent = 11;
    return(
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="default__info">
                <h1>{translate('mining.make_contribution')}</h1>
                <div className="row row-grid">
                  <div className="col-md-12 col-sm-12 col-xs-12">

                    <InputNumber
                      min={0}
                      parser={parseNumber}
                      placeholder={translate('form.amount')}
                      value={form.amount}
                      onChange={value => { typeof value === 'undefined' ? updateField('amount', ''): updateField('amount', value)}} />
                    {validateDate.amount !== '' ? <Validation message={validateDate.amount} />: null}
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <Select style={{width: '100%'}} value="">
                      <Option value="">{miningPool.title} ({miningPool.location},  {translate('mining.trans_in_minute', {number: miningPool.transactions_per_minute}).toLowerCase()})</Option>
                    </Select>
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12">

                    <TextArea
                      rows={5}
                      placeholder={`${translate('form.comment')} (${translate('coupon.optional_field')})`}
                      value={form.description} onChange={ev => updateField('description', ev.target.value)}/>
                    {validateDate.description !== '' ? <Validation message={validateDate.description} />: null}
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12" style={{position: 'relative'}}>
                    <Checkbox checked={form.hold} onChange={ev => updateField('hold', !form.hold)} style={{ verticalAlign: '2.5rem'}}>
                      <span style={{fontWeight: 500, fontSize: '2rem', verticalAlign: 'middle', color: 'black'}}>
                        {translate('mining.hold_year')}
                      </span>
                    </Checkbox>
                    <p>{translate('mining.description_hold_total', {number_percent: toFixed(Number(form.amount)* 0.2), summary: toFixed(Number(form.amount) + Number(form.amount)* 0.2)})}</p>
                  </div>

                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <p style={{margin: 0}}>{translate('mining.summary_contribution')}</p>
                    <h1 style={{margin: 0}}>{form.hold ? toFixed(Number(form.amount)* 0.2 + Number(form.amount)) : Number(form.amount)} CNX</h1>
                  </div>

                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <p style={{margin: 0}}>{translate('mining.summary_contribution_in_year')}</p>
                    <h1 style={{margin: 0}}>
                      {form.hold ?
                        toFixed((Number(form.amount)* 0.2 + Number(form.amount)) / 100 * percent + (Number(form.amount)* 0.2 + Number(form.amount))) :
                        toFixed(Number(form.amount) / 100 * percent + Number(form.amount))} CNX
                    </h1>
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12 text-right">
                    <Button
                      type="primary"
                      onClick={creatingMining}
                      loading={processingCreate}
                    >
                      {translate('action.send')}
                    </Button>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-sm-12">
              <h1>{translate('mining.mining-support-0')}</h1>
              <span></span>
              <p style={{ fontSize: '14px', margin: 10}}>{translate('mining.mining-support-1')}</p>
              <p style={{ fontSize: '14px', margin: 10}}>{translate('mining.mining-support-2')}</p>
              <p style={{ fontSize: '14px', margin: 10}}>{translate('mining.mining-support-3')}</p>
              <p style={{ fontSize: '14px', margin: 10}}>{translate('mining.mining-support-4')}</p>
              <h1 style={{marginTop: 30}}>{translate('mining.mining-support-5')}</h1>
              <span></span>
              <p style={{ fontSize: '14px', margin: 10}}>{translate('mining.mining-support-6')} {miningPool.title}</p>
              <p style={{ fontSize: '14px', margin: 10}}>{translate('mining.mining-support-7')} {miningPool.location}</p>
              <p style={{ fontSize: '14px', margin: 10}}>{translate('mining.mining-support-8')} {miningPool.transactions_per_minute} {translate('mining.minutes')}</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default CreateForm;