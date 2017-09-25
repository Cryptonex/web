import React, { Component } from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

import style from './style.styl';

const propsTypes = {
  isOpen: PropTypes.bool
};


export default class Collapse extends Component {
  constructor() {
    super(...arguments);
    const { isOpen } = this.props;

    this.state = {
      isOpened: isOpen != undefined ? isOpen: false,
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onShow() {
    this.setState({ isOpened: true })
  }

  onHide() {
    this.setState({ isOpened: false });
  }

  onToggle() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    const { trigger, children } = this.props;
    let classes = className({
      collapse: true,
      show: this.state.isOpened
    });

    return (
      <div className={classes} >
        <div className="collapse-trigger" onClick={this.onToggle}>
          {trigger}
        </div>

        <div className="collapse-content">
          {children}
        </div>
      </div>
    );
  }
}