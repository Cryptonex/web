import React, { Component } from 'react';
import Select from '@antd/select';
const Option = Select.Option;
import Input from '@antd/input';
const InputGroup = Input.Group;
const TextArea = Input.TextArea;
import DatePicker from '@antd/date-picker';
import Button from '@antd/button';
import { translate } from "../../base/settings";
import { parseNumber } from "../../base/utils";
import InputNumber from '@antd/input-number';
import moment from 'moment';
import PropTypes from 'prop-types';
import { disabledDate } from "../../base/utils";
import { Validation } from "../../main/components/common/Form";

const propTypes = {
  currencies: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  processingCreate: PropTypes.bool.isRequired,
  updateField: PropTypes.func.isRequired,
};

class CreateCoupon extends Component {
  onChangeExpiredTime = (time) => {
    const { updateField } = this.props;
    if (time === null) {
      return updateField('expire_at', '');
    }

    updateField('expire_at', `${time.format('YYYY-MM-DD')} 00:00:00`);
  };
  
  render() {
    const { currencies, form, updateField, create, validateDate } = this.props;
    const style = {
      inputNumber: { width: '80%' },
      selectCurrency: { width: '20%' }
    };
    
    return(
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="default__info">
                <h1>{translate('coupon.create_coupon')}</h1>
                <div className="row row-grid">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    {validateDate.amount !== '' ? <Validation message={validateDate.amount} />: null}
                    {validateDate.currency !== '' ? <Validation message={validateDate.currency} />: null}
                    <InputGroup compact>
                      <InputNumber
                        placeholder={translate('form.amount')}
                        min={0}
                        value={form.amount}
                        onChange={value => updateField('amount', value)}
                        parser={parseNumber}
                        style={style.inputNumber}
                        autoComplete="off"
                      />
                      <Select 
                        style={style.selectCurrency} 
                        placeholder={translate("coupon.select_currency")} 
                        value={form.currency}
                        onChange={value => updateField('currency', value)}
                      >
                        {currencies.map(item => <Option value={item.currency} key={item.currency}>{item.currency.toUpperCase()}</Option>)}
                      </Select>
                    </InputGroup>
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <Input 
                      placeholder={`${translate("coupon.receiver")} (${translate('coupon.optional_field')})`} 
                      autoComplete="off" 
                      value={form.receiver}
                      onChange={event => updateField('receiver', event.target.value)}
                    />
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <Input 
                      placeholder={`${translate("form.password")} (${translate('coupon.optional_field')})`} 
                      type="password" 
                      autoComplete="off" 
                      name="coupon_password" 
                      id="coupon_password"
                      value={form.password}
                      onChange={event => updateField('password', event.target.value)}
                    />
                  </div>
                  
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-md-6 col-xs-12 col-sm-12">
                        <TextArea 
                          rows={5} 
                          placeholder={`${translate("form.comment")} (${translate('coupon.optional_field')})`}
                          value={form.comment}
                          onChange={event => updateField('comment', event.target.value)}
                        />
                      </div>
                      <div className="col-md-6 col-xs-12 col-sm-12">
                        <div className="row row-grid">
                          <div className="col-md-12 col-sm-12 col-xs-12">
{/*                            <DatePicker
                              style={{width: '100%'}}
                              placeholder={translate("coupon.time_of_action")}
                              format="YYYY-MM-DD"
                              value={form.expire_at ? moment(form.expire_at): null}
                              onChange={this.onChangeExpiredTime}
                              disabledDate={disabledDate}
                            />*/}
                          </div>
                          
                          <div className="col-md-12 col-sm-12 col-xs-12 text-right">
                            <Button type="primary" onClick={create}>{translate("action.create")}</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


CreateCoupon.propTypes = propTypes;
export default CreateCoupon;