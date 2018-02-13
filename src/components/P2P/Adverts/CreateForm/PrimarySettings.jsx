import React from 'react';
import { arrayRatio } from "base/constants";
import { translate } from "base/utils";

function PrimarySettings(props) {
  return(
    <div className="col-md-12 col-sm-12 col-xs-12">
      <div className="default__info">
        <div className="row">
          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.order_type')}</label>
            <select className='form form-full__width'>
              {arrayRatio.map(item => <option value={item.type} key={item.type}>{translate(item.text)}</option>)}
            </select>
          </div>

          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.country')}</label>
            <select className='form form-full__width'>
              <option value="">{translate('action.select')}</option>
              {arrayRatio.map(item => <option value={item.type} key={item.type}>{translate(item.text)}</option>)}
            </select>
          </div>

          <div className="col-md-4 col-sm-12 col-xs-12">
            <label className="form-label">{translate('form.payment_system')}</label>
            <select className='form form-full__width'>
              <option value="">{translate('action.select')}</option>
              {arrayRatio.map(item => <option value={item.type} key={item.type}>{translate(item.text)}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrimarySettings;
