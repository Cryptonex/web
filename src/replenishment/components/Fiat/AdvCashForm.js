import React from 'react';

function AdvCashForm(props) {
  const { amount, currency, id } =  props;
  return (
    <form method="post" action="https://wallet.advcash.com/sci/" ref={props.formRef}>
      <input type="hidden" name="ac_account_email" value="cryptonex.org@gmail.com" />
      <input type="hidden" name="ac_sci_name" value="Cryptonex" />
      <input type="hidden" name="ac_amount" defaultValue={amount} />
      <input type="hidden" name="ac_currency" defaultValue={currency} />
      <input type="hidden" name="ac_order_id" defaultValue={id} />
      <input type="hidden" name="ac_success_url" value="https://wallet.cryptonex.org/app/advcash/success" />
      <input type="hidden" name="ac_success_url_method" value="GET" />
      <input type="hidden" name="ac_fail_url" value="https://wallet.cryptonex.org/app/advcash/error" />
      <input type="hidden" name="ac_fail_url_method" value="GET" />
      <input type="hidden" name="ac_status_url" value="https://payment.cryptonex.org/advcash/status" />
      <input type="hidden" name="ac_status_url_method" value="POST" />
      <input type="hidden" name="ac_comments" value="Comment" />
    </form>
  )
}

export default AdvCashForm;
