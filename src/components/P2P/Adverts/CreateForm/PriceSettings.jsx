import React from 'react';
import NumInput from 'react-numeric-input';
import { parseNumber } from "base/utils";
import { translate } from "base/utils";

function PriceSettings(props) {
  return(
    <div className="col-md-12 col-sm-12 col-xs-12">
      <div className="default__info">
        <div className="row row-grid">
          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.exchange_currency')}</label>
            <select className='form form-full__width'>
              <option value="">{translate('action.select')}</option>
            </select>
          </div>

          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.payment_currency')}</label>
            <select className='form form-full__width'>
              <option value="">{translate('action.select')}</option>
            </select>
          </div>

          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.payment_rate')}</label>
            <NumInput min={0} className="form form-full__width" parse={parseNumber} noStyle/>
          </div>

          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.amount_min_info')}</label>
            <NumInput min={0} className="form form-full__width" parse={parseNumber} noStyle/>
          </div>

          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.amount_max_info')}</label>
            <NumInput min={0} className="form form-full__width" parse={parseNumber} noStyle/>
          </div>

          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.amount_limit')}</label>
            <NumInput min={0} className="form form-full__width" parse={parseNumber} noStyle/>
          </div>

          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.time_expired_minutes')}</label>
            <NumInput min={0} className="form form-full__width" parse={parseNumber} noStyle/>
          </div>

          <div className="col-md-12 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.description')}</label>
            <textarea cols="30" rows="10" className="form form-full__width"></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 text-right">
            <button className="button small button-cover primary">{translate('action.create')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default PriceSettings;
