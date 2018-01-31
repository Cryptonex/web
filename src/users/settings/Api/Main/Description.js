import React from 'react';


function Description(props) {
  return (
    <div className="row">
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="default__info">
          <p>This API allows to trade on the exchange and receive information about the account.</p>
          <p>To use this API, you need to create an API key.
            An API key can be created in your Settings in the Setting Api section. After creating an API key you’ll receive a key and a secret.
            API key information is used for authentication.</p>
          <p>All requests sends to the following URL: https://webapi.cryptonex.org/api</p>
          <p>The method name and all method parameters are sent via the POST-method in params JSON-RPC.</p>
          <p>Each request needs an authentication.</p>
          <p>Authentication is made by sending the following params JSON-RPC 2.0.</p>
        </div>
      </div>
    </div>
  )
}

export default Description;
