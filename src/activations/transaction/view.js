import React, { Component } from 'react';
import Processing from 'elements/processing';

class ActivationTransaction extends Component {

  componentDidMount() {
    const { match, confirmTransaction } = this.props;
    const { code } = match.params;
    confirmTransaction(code);
  }

  render() {
    const { error, processing } = this.props;

    if (processing) {
      return (
        <div className="activation__sub">
          <Processing/>
        </div>
      )
    }

    return (
      <div className="activation__sub">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              {error ?
              <div className="default__info" style={{textAlign: 'center'}}>
                Error! The transaction has not been confirmed.
              </div> :
              <div className="default__info" style={{textAlign: 'center'}}>
                The transaction has been confirmed.
              </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ActivationTransaction;
