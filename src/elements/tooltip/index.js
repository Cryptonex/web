import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styl from './tooltip.styl';

const propTypes = {
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  arrow: PropTypes.number,
  offset: PropTypes.number,
  maxWidth: PropTypes.number,
  color: PropTypes.string,
  message: PropTypes.string.isRequired,
};

const defaultProps = {
  placement: 'right',
  arrow: 8,
  offset: 4,
  maxWidth: 210,
  color: 'rgba(0,0,0,.85)'
};

class Tooltip extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      display: false
    };

    this._root = null;
    this._tooltip = null;

    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  componentDidMount() {
    this._root = ReactDOM.findDOMNode(this);

    this._root.addEventListener('mouseenter', this.onShow);
    this._root.addEventListener('mouseleave', this.onHide);

    this.onHide();
  }

  componentWillUnmount() {
    this._root.removeEventListener('mouseenter', this.onShow);
    this._root.removeEventListener('mouseleave', this.onHide);
  }

  get getPosition() {
    const { arrow, offset, placement } = this.props;

    const
      rect = this._root.getBoundingClientRect(),
      comp = this._tooltip.getBoundingClientRect(),
      margin = arrow ? offset + arrow : offset;

    let
      top = 0,
      left = 0;

    switch (placement) {
      case 'top':
        top = rect.top - comp.height - margin;
        left = rect.left + rect.width / 2 - comp.width / 2;
        return { top, left };

      case 'bottom':
        top = rect.bottom + margin;
        left = rect.left + rect.width / 2 - comp.width / 2;
        return { top, left };

      case 'left':
        top = rect.top + rect.height / 2 - comp.height / 2;
        left = rect.left - comp.width - margin;
        return { top, left };

      default:
        top = rect.top + rect.height / 2 - comp.height / 2;
        left = rect.right + margin;
        return { top, left };
    }
  }

  onShow() {
    this._tooltip = document.createElement('div');
    document.body.appendChild(this._tooltip);
    ReactDOM.render(this.template, this._tooltip);

    this._tooltip.className = 'tooltip tooltip-' + this.props.placement;
    this._tooltip.style.maxWidth = this.props.maxWidth + 'px';
    this._tooltip.style.top = this.getPosition.top + 'px';
    this._tooltip.style.left = this.getPosition.left + 'px';
  }

  onHide() {
    if (this._tooltip) {
      ReactDOM.unmountComponentAtNode(this._tooltip);
      document.body.removeChild(this._tooltip);
    }
  }

  get template() {
    const { arrow, color, message } = this.props;

    const arrowStyle = {
      borderColor: color,
      borderWidth: arrow
    };

    const messageStyle = {
      backgroundColor: color
    };

    return (
      <div className="tooltip-message" style={messageStyle}>
        {
          arrow ?
            <div className="tooltip-arrow" style={arrowStyle}></div>
            : null
        }
        {message}
      </div>
    )
  }

  render() {
    const { children } = this.props;

    return children || null
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;