import React, { PureComponent } from 'react';
import qrcode from 'qrcode-generator';
import { translate } from "base/utils";

class Code extends PureComponent {
  constructor(){
    super(...arguments);
    this.state = {
      url: ''
    }
  }
  componentDidMount() {
    const { url } = this.props;
    let qrcodeLay = this.refs.qrcode;
    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(url);
    qr.make();
    qrcodeLay.innerHTML = qr.createImgTag(5);
    this.setState({url: qrcodeLay.childNodes[0].src})
  }

  render() {
    const { url } = this.props;
    return (
      <div className="code">
        <div  ref='qrcode' style={{textAlign: 'center'}}>
        </div>
        <p style={{fontSize: '0.9rem'}}>{translate('page.your_secret_key')}: {url.split('=')[1]}</p>
        <div style={{marginTop: '18px', textAlign: 'center'}}>
          <a href={this.state.url} download="qrcode.gif" className="button button-cover primary small">{translate('action.save_qr')}</a>
        </div>
      </div>
    )
  }
}

export default Code;
