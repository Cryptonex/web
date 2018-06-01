import React, { Component } from 'react';
import { translate } from "../../base/settings";
import Select from '@antd/select';
const Option = Select.Option;
import Input from '@antd/input';
const InputGroup = Input.Group;
import Button from '@antd/button';
import QrReader from 'react-qr-reader';
import Alert from '@antd/alert';
import PropTypes from 'prop-types';
import { parseNumber } from "../../base/utils";
import InputNumber from '@antd/input-number';
import { Validation } from "../../main/components/common/Form";

const propTypes = {
  form: PropTypes.object.isRequired,
  processingApply: PropTypes.bool.isRequired,
  updateField: PropTypes.func.isRequired,
};

class ApplyCoupon extends Component {
  state = {
    delay: 600,
    result: '',
    error: null,
    scan: false,
  };

  handleError = (error) => {
    console.log(error);
    this.setState({error});
  };

  handleScan = (data) => {
    const { updateField  } = this.props;
    let coupon;
    try {
      coupon = JSON.parse(data);
    } catch (e) {
      coupon = null;
    }

    if (coupon === null) {
      return;
    }

    if (data){
      updateField('coupon', coupon.coupon);
      this.setState({ scan: false });
    }
  };
  
  changeStatusScan = () => {
    this.setState({ scan: !this.state.scan })
  };
  
  renderScanner = () => {
    const { error } = this.state;
    
    if (error && error.name === "NotAllowedError") {
      return(
        <div className="col-md-12 col-xs-12 col-sm-12">
          <div className="row row-center row-grid">
            <div className="col-md-6 col-sm-12 col-xs-12">
              <Alert type="error" className="text-center" message={<a onClick={ev => location.reload()}>{translate('coupon.not_access_camera')}</a>} />
            </div>
            
            <div className="co-md-12 col-sm-12 col-xs-12 text-center">
              <Button type="primary" onClick={this.changeStatusScan}>{translate('action.cancel')}</Button>
            </div>
          </div>
        </div>
      )
    }

    return(
      <div className="col-md-12 col-xs-12 col-sm-12">
        <div className="row row-center row-grid">
          <div className="col-md-6 col-sm-12 col-xs-12">
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%', minHeight: '400px' }}
            />
          </div>
          <div className="co-md-12 col-sm-12 col-xs-12 text-center">
            <Button type="primary" onClick={this.changeStatusScan}>{translate('action.cancel')}</Button>
          </div>
        </div>
      </div>
    );
  };
  
  renderForm = () => {

    const { currencies, form, updateField, processingApply, validateDate, apply } = this.props;
    const style = {
      inputNumber: { width: '80%' },
      selectCurrency: { width: '20%' }
    };
    
    return(
      <div className="col-md-6 col-sm-12 col-xs-12">
        <div className="default__info">
          <h1>{translate('coupon.apply_coupon')}</h1>
          <form autoComplete="off">
            <div className="row row-grid">
              <div className="col-md-12 col-sm-12 col-xs-12">
                {validateDate.coupon !== '' ? <Validation message={validateDate.coupon} />: null}
                <Input 
                  placeholder={translate('coupon.coupon')} 
                  value={form.coupon}
                  onChange={ev => updateField('coupon', ev.target.value)}
                />
              </div>

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
                <div className="row row-between">
                  <div className="col-md-0 col-xs-0 col-sm-0">
                    <Button onClick={this.changeStatusScan}>{translate('coupon.scanning_coupon')}</Button>
                  </div>
                  <div className="col-md-0 col-xs-0 col-sm-0">
                    <Button type="primary" loading={processingApply} onClick={apply}>{translate('coupon.apply')}</Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  render() { 
    const { scan } = this.state;
    
    return(
      <div className="row">
        {scan ? this.renderScanner(): this.renderForm()}
      </div>
    )
  }
}

export default ApplyCoupon;