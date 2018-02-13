import React, { Component } from 'react';
import PrimarySettings from './PrimarySettings';
import { translate } from "base/utils";
import PriceSettings from './PriceSettings';

function CreateForm(props) {
  return(
    <div className="row row-grid">
      <div className="col-md-12 col-sm-12 col-xs-12">
        <h5>{translate('page.create_advert')}</h5>
      </div>
      <PrimarySettings />
      <PriceSettings />
    </div>
  );
}

export default CreateForm;
