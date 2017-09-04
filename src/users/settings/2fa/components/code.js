import React, { PureComponent } from 'react';
import qrcode from 'qrcode-generator';

class Code extends PureComponent {
  componentDidMount() {
    const { url } = this.props;
    let qrcodeLay = this.refs.qrcode;
    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(url);
    qr.make();
    qrcodeLay.innerHTML = qr.createImgTag(5);
  }

  render() {
    return (
      <div className="code" ref='qrcode' style={{textAlign: 'center'}}>

      </div>
    )
  }
}

export default Code;