import React, { Component } from 'react';

import TwoFaEnable from './components/enable';
import TwoFaDisable from './components/disabled';

class TwoFa extends Component {

  render() {
    const { form, error, url, updateForm, getQrcodeUrl, processing, setEnable2fa, profile } = this.props;
    const enableProps = { form, error, url, updateForm, getQrcodeUrl, processing, setEnable2fa };
    const disableProps = { form, error, updateForm, processing, setEnable2fa };
    return (
      <div className="row">
        {!profile.info.auth_2fa ? <TwoFaEnable {...enableProps}/>: <TwoFaDisable {...disableProps} />}
      </div>
    )
  }
}


export default TwoFa;