import React, { Component } from 'react';


let fields = [
  {name: 'amount', title: 'Amount:'},
  {name: 'address', title: 'Send to:'},
]

class Withdraw extends Component {
  render() {
    return(
      <div className="withdraw">
        <div className="withdraw__container">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="withdraw__container-form">
                  {fields.map((item, index) =>
                    <div className="withdraw__container-form__item" key={index}>
                      <label className="form-label">{item.title}</label>
                      <input type="text" className="form form-full__width"/>
                    </div>
                  )}
                  <div className="withdraw__container-form__item">
                    <div className="withdraw__container-form__item-error">
                      Error!
                    </div>
                    <div className="withdraw__container-form__item-button">
                      <a className="withdraw__container-form__item-button__link">Send</a>
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