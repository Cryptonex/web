import React, { Component } from 'react';
import Scrollbar from 'elements/scrollbar';
import className from 'classnames';
import { translate } from "../base/utils";

export default class TablePair extends Component {
  render() {
    const { rates, onChangePair, pair } = this.props;
    return(
      <div className="exchange-table">
        <div className="col-md-12">
          <div className="row title">
            <div className="col-xs-6">
              <h5>{translate('page.charts')}</h5>
            </div>
{/*            <div className="col-xs-6">
              <div className="form-compare">
                <input type="text" value="" placeholder="Search"/>
              </div>
            </div>*/}
          </div>
        </div>
        <div className="col-md-12">
          <div className="row header-table">
            <div className="col-xs-3">{translate('page.pair')}</div>
            <div className="col-xs-3">{translate('page.price')}</div>
            <div className="col-xs-6">{translate('page.volume')} (CNX)</div>
          </div>
        </div>
        <div className="body">
          {rates.filter(item => item.convert_type === 'cross').map((item, index) => {
            return (
              <div className={className({'col-md-12': true, active: item.alias === pair})}
                   onClick={ e => onChangePair(item.alias)}
                   key={index}>
                <div className="row row-inline">
                  <div className="col-xs-3">{item.alias}</div>
                  <div className="col-xs-3">{item.rel_type === 'crypto' ? Number(item.ask).toFixed(8): Number(item.ask).toFixed(2)}</div>
                  <div className="col-xs-6">{Math.round(item.value_last_24h * 100) / 100}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
