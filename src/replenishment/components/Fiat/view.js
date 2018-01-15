import React, { Component } from 'react';
import Processing from 'elements/processing';

class FiatForm extends Component {
  onSubmit = (ev) => {
    const { sendRequestFiat, form } = this.props;
    ev.preventDefault();
    sendRequestFiat(form, this.from);
  };

  componentDidMount() {
    const { loadPaymentSystem } = this.props;
    loadPaymentSystem();
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
    return(
      <div>
        <form className="row" onSubmit={this.onSubmit}>
          <div className="col-md-8 col-sm-12 col-xs-12" style={{position: 'relative'}}>
            <div className="row row-grid">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <label className="form-label">Payment system:</label>
                <select
                  className="form form-full__width"
                  value={form.payment_system}
                  onChange={ev => updateForm('payment_system', ev.target.value)}
                >
                  <option value="">Select</option>
                  {payment.list.map((item) => {
                    return (
                      <option value={item.payment_system} key={item.payment_system}>{item.alias}</option>
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
        <form method="post" action="https://wallet.advcash.com/sci/" ref={ref => this.from = ref}>
          <input type="hidden" name="ac_account_email" value="hello@cryptonex.org" />
          <input type="hidden" name="ac_sci_name" value="Cryptonex" />
          <input type="hidden" name="ac_amount" defaultValue={form.amount} />
          <input type="hidden" name="ac_currency" defaultValue={order.currency.toUpperCase()} />
          <input type="hidden" name="ac_order_id" defaultValue={order.id} />
          <input type="hidden" name="ac_success_url" value="https://wallet.cryptonex.org/advcash/success" />
          <input type="hidden" name="ac_success_url_method" value="GET" />
          <input type="hidden" name="ac_fail_url" value="https://wallet.cryptonex.org/advcash/fault" />
          <input type="hidden" name="ac_fail_url_method" value="GET" />
          <input type="hidden" name="ac_status_url" value="https://payment.cryptonex.org/advcash/status" />
          <input type="hidden" name="ac_status_url_method" value="POST" />
          <input type="hidden" name="ac_comments" value="Comment" />
        </form>
      </div>
    )
  }
}

export default FiatForm;
