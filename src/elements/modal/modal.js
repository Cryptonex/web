import React, { Component } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import { modal } from './index';

const propTypes = {
  title: PropTypes.string,
  modalState: PropTypes.shape({
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  options: PropTypes.shape({
    width: PropTypes.number,
    submit: PropTypes.shape({
      title: PropTypes.string,
      action: PropTypes.func
    }),
    cancel: PropTypes.shape({
      title: PropTypes.string,
      action: PropTypes.func
    }),
    processing: PropTypes.bool
  })
};


const defaultProps = {
  options: {
    width: 600,
    submit: null,
    cancel: null,
    processing: false
  }
};


class Window extends Component {

  constructor() {
    super(...arguments);

    this.state = {
      process: false
    };
  }

  render(){
    const { title, options, children, modalState } = this.props;

    return (
      <div className={`modal-window modal-window-${modalState.className}`} style={{maxWidth: options.width}}>
        <div className="header">
          <div className="row row-middle row-between">
            <div className="col-sm-auto col-md-auto col-lg-auto">
              <h3>{title}</h3>
            </div>

            <div className="col-sm-0 col-md-0 col-lg-0">
              <button className="button button-icon" onClick={() => { modal.remove(modalState.id)}}>
                <i className="material-icons">clear</i>
              </button>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              {children}
            </div>
          </div>
        </div>

        {
          options.submit ?
            <div className="footer" style={{marginTop: '20px'}}>
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <button className="button button-block button-tint button-primary button-text"
                          onClick={this.handleCancel.bind(this)}>
                          {options.cancel ? options.cancel.title : 'Отмена'}
                    </button>
                </div>

                <div className="col-sm-6 col-md-6 col-lg-6">
                  <button disabled={options.processing}
                          ref="button"
                          className={className('button button-block button-tint button-primary button-text',
                            { 'button-processing': options.processing })}
                          onClick={this.handleSubmit.bind(this)}>
                    <span className="button-text">{options.submit.title}</span>
                    <div className="button-processing-animate"><span></span></div>
                  </button>
                </div>
              </div>
            </div> : null
        }
      </div>

    )
  }

  handleSubmit() {
    const { options } = this.props;

    if (options.submit) {
      options.submit.action()
    }

  }

  handleCancel() {
    const { modalState, options } = this.props;

    if (options.cancel) {
      options.cancel.action();
    }
    modal.remove(modalState.id);

  }

}

Window.propTypes = propTypes;

Window.defaultProps = defaultProps;


export default Window;