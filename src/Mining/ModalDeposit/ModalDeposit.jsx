import React, { Component } from 'react';
import Modal from '@antd/modal';
import { translate } from "../../base/utils";
import InputNumber from '@antd/input-number';
import Button from '@antd/button';
import { parseNumber } from "../../base/utils";
import { Validation } from "../../main/components/common/Form";


class ModalDeposit extends Component{
  render() {
    const {showModal, closeModal, form, validateDate, updateField, deposit, processing } = this.props;

    const footer = (
      <div className="row row-right">
        <div className="col-md-0 col-sm-0 col-xs-0">
          <Button onClick={closeModal}>{translate('action.cancel')}</Button>
        </div>
        <div className="col-md-0 col-sm-0 col-xs-0">
          <Button onClick={deposit} type='primary' loading={processing}>{translate('form.refill')}</Button>
        </div>
      </div>
    );

    return(
      <Modal
        visible={showModal}
        title={translate('mining.income_contribution')}
        footer={footer}
        onCancel={closeModal}
      >
        <div className="row row-grid">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <InputNumber placeholder={translate('form.amount')} value={form.amount} min={0} parse={parseNumber} onChange={value => updateField('amount', value)}/>
            {validateDate.amount !== '' ? <Validation message={validateDate.amount} />: null}
          </div>
        </div>

      </Modal>
    )
  }
}

export default ModalDeposit;