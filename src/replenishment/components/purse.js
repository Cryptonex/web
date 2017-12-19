import React, { Component, PureComponent} from 'react';
import qrcode from 'qrcode-generator';

export default class Purse extends PureComponent {
  componentDidMount() {
    const { wallet } = this.props;
    let qrcodeLay = this.refs.qrcode;
    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(wallet.hash);
    qr.make();
    qrcodeLay.innerHTML = qr.createImgTag(3);
  }

  componentDidUpdate() {
    const { wallet } = this.props;
    let qrcodeLay = this.refs.qrcode;
    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(wallet.hash);
    qr.make();
    qrcodeLay.innerHTML = qr.createImgTag(3);
  }

  copy = (ev) => {
    let field = this.refs['hashInput'];
    field.type='text';
    field.select();
    document.execCommand("Copy", false, null);
    field.type='hidden'
  }


  render() {
    const { wallet } = this.props;
    return (
      <div className="purse">
        <div className="row">
          <div className="col-md-4 col-xs-12 col-sm-12 contain">
            <h5 style={{textAlign: 'center', fontSize: '14px'}}><b>Deposit by scanning below</b></h5>
            <div className="q-code" id="q-code" ref='qrcode' style={{textAlign: 'center'}}>

            </div>
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 contain">
            <h5 style={{textAlign: 'center', fontSize: '14px'}}><b>or direct deposit to</b></h5>
            <div className="purse__text" id="q-code" style={{textAlign: 'center'}}>
                <button
                  onClick={this.copy}
                  className="button button-cover primary small"
                  style={{marginTop: '20px'}}>Copy</button>
                <div className="purse__text-box" style={{margin: '28px 0'}}>
                  <input type="hidden" value={wallet.hash}
                         ref="hashInput"/>
                  {wallet.hash}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
