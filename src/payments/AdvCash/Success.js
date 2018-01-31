import React from 'react';
import QueryString from 'query-string';

function Success(props) {
  const { location } = props;
  const query = QueryString.parse(location.search);

  return(
    <div className="row-center row">
      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
        <img src={require('assets/images/success.svg')} style={{width: '200px'}}/>
      </div>
      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
        <h2 style={{color: '#25ae88'}}>
          Success order
        </h2>
      </div>
      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
        <h3>
          {query.ac_order_id ? `#${query.ac_order_id}`: ''}
        </h3>
      </div>
    </div>
  );
};

export default Success;
