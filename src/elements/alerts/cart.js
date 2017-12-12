import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


import { alert } from './index';

const propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  effect: PropTypes.string.isRequired,
  lifetime: PropTypes.number
};

class AlertCart extends Component {
  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    const { lifetime } = this.props;

    if (lifetime) {
      this.autodestroy(lifetime * 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._time);
  }

  autodestroy(delay) {
    const { id } = this.props;

    this._time = setTimeout(() => {
      alert.close(id);
    }, delay);
  }

  render() {
    const { id, type, message, effect } = this.props;

    return (
      <div className={classNames('alert', 'alert-' + type, effect)}>
        <div className="header">
          <div className="row row-between">
            <div className="col-sm-auto col-md-auto col-lg-auto">
              <span>{type}</span>
            </div>

            <div className="col-sm-0 col-md-0 col-lg-0">
              <button onClick={() => alert.close(id)}>
                <i className="material-icons">clear</i>
              </button>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <span>{message}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AlertCart.propTypes = propTypes;

export default AlertCart;
