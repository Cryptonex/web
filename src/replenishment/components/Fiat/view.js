import React, { Component } from 'react';
import Processing from 'elements/processing';
import AdvCashForm from './AdvCashForm';

class FiatForm extends Component {
  onSubmit = (ev) => {
    const { sendRequestFiat, form } = this.props;
    ev.preventDefault();
    console.log(this.form)
    sendRequestFiat(form, this.form);
  };

  componentDidMount() {
    const { loadPaymentSystem } = this.props;
    loadPaymentSystem();

  }

  componentWillUnmount () {
    const { dispatch } = this.props;
    dispatch({ type: 'FIAT_LEAVE_PAGE' })
  }

  renderError = () => {
    const { error } = this.props;
    if (error === '') {
      return null;
    }

    return(
      <div className="row">
        <div className="col-md-0 col-sm-0 col-xs-0">
          <div className="field-error" style={{marginBottom: '0'}}>
            {error}
          </div>
        </div>
      </div>
    );
  };

  render() {

    const { form, updateForm, processing, payment, order } = this.props;

    let formPayment = null;

    if (form.payment_system.indexOf('advcash') !== -1) {
      formPayment =  <AdvCashForm amount={form.amount} id={order.id} currency={order.currency.toUpperCase()} formRef={ref=> this.form = ref}/>;
    }

    return(
      <div style={{marginTop: '20px'}}>
        <form className="row" onSubmit={this.onSubmit}>
          <div className="col-md-8 col-sm-12 col-xs-12" style={{position: 'relative'}}>
            <div className="row row-grid">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <label className="form-label">Currency:</label>
                <select
                  className="form form-full__width"
                  value={form.payment_system}
                  onChange={ev => updateForm('payment_system', ev.target.value)}
                >
                  <option value="">Select</option>
                  {payment.list.sort((first, second) => first.currency > second.currency).map((item) => {
                    return (
                      <option value={item.payment_system} key={item.payment_system}>{item.currency.toUpperCase()}</option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <label className="form-label">Amount:</label>
                <input
                  type="text"
                  className="form form-full__width"
                  value={form.amount}
                  onChange={ev => updateForm('amount', ev.target.value.replace(",","."))}
                />
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                {this.renderError()}
                <div className="row row-right">
                  <div className="col-xs-0">
                    <button className="button button-cover primary small">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
            { processing ? <Processing /> : null}
          </div>

        </form>
        {formPayment}
      </div>
    )
  }
}

export default FiatForm;
