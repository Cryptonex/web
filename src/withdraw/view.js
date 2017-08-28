import React, { Component } from 'react';


class Withdraw extends Component {
  render() {
    return(
      <div className="withdraw">
        <div className="withdraw__container">
          <div className="container">
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <div className="withdraw__container-form">
                  <div className="withdraw__container-form__item">
                    <label className="form-label">Amount:</label>
                    <input type="text" className="form form-full__width"/>
                  </div>
                  <div className="withdraw__container-form__item">
                    <label className="form-label">Send to:</label>
                    <input type="text" className="form form-full__width"/>
                  </div>
                  <div className="withdraw__container-form__item">
                    <div className="withdraw__container-form__item-button">
                      <a className="withdraw__container-form__item-button__link">Send</a>
                    </div>
                    <div className="withdraw__container-form__item-error">
                      Error!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Withdraw;