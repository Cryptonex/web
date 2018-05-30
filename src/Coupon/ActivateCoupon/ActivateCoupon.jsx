import React, { Component } from 'react';
import { translate } from "../../base/settings";
import Input from '@antd/input';
import Button from '@antd/button';
import QrReader from 'react-qr-reader';
import Alert from '@antd/alert';
import ProptTypes from 'prop-types';

const propTypes = {
  form: ProptTypes.object.isRequired,
  processingActivate: ProptTypes.bool.isRequired,
  updateField: ProptTypes.func.isRequired,
};

class ActivateCoupon extends Component {
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
    
    const { form, updateField, processingActivate, activate } = this.props;
    
    return(
      <div className="col-md-6 col-sm-12 col-xs-12">
        <div className="default__info">
          <h1>{translate('coupon.activate_coupon')}</h1>
          <form autoComplete="off">
            <div className="row row-grid">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <Input 
                  placeholder={translate('coupon.coupon')} 
                  value={form.coupon}
                  onChange={ev => updateField('coupon', ev.target.value)}
                />
              </div>

              <div className="col-md-12 col-sm-12 col-xs-12">
                <Input
                  placeholder={translate("form.password")}
                  type={"password"}
                  autoComplete="off"
                  name="coupon_password"
                  id="coupon_password"
                  value={form.password}
                  onChange={ev => updateField('password', ev.target.value)}
                />
              </div>

              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="row row-between">
                  <div className="col-md-0 col-xs-0 col-sm-0">
                    <Button onClick={this.changeStatusScan} >{translate('coupon.scanning_coupon')}</Button>
                  </div>
                  <div className="col-md-0 col-xs-0 col-sm-0">
                    <Button type="primary" loading={processingActivate} onClick={activate} disabled={!form.coupon}>{translate('action.activate')}</Button>
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

export default ActivateCoupon;