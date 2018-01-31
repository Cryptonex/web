import React, { Component } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

class Pane extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="tab-content">
        {children}
      </div>
    );
  }
}

export default Pane;