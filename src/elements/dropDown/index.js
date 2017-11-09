import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import className from 'classnames';
import style from './style';

const propTypes = {
  trigger: PropTypes.node.isRequired,
  placement: PropTypes.string,
  autoclose: PropTypes.bool,
  callback: PropTypes.func
};

const defaultProps = {
  placement: 'left',
  autoclose: true,
  callback: null
};

class Dropdown extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      display: false
    };

    this.onClickOutside = this.onClickOutside.bind(this);
  }

  onShow() {
    this.setState({ display: true });
  }

  onHide() {
    this.setState({ display: false });
  }

  onToggle() {
    this.setState({ display: !this.state.display });
  }

  onClickOutside(e) {
    const
      { autoclose } = this.props,
      content = this.refs.content;

    if (autoclose && ReactDOM.findDOMNode(content).contains(e.target) || !ReactDOM.findDOMNode(this).contains(e.target)) {
      this.onHide();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const
      { display } = this.state,
      { callback } = this.props;

    if (nextState.display !== display && nextState.display && callback) {
      callback();
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClickOutside);
  }

  render() {
    const
      { display } = this.state,
      { trigger, children, placement } = this.props,

      dropdownClass = className({
        'dropdown': true,
        [`dropdown-${placement}`]: true,
        'show': display
      });

    return (
      <div className={dropdownClass}>
        <div className="dropdown-trigger" onClick={this.onToggle.bind(this)}>
          {trigger}
        </div>

        <div className="dropdown-content" ref="content">
          {children}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
