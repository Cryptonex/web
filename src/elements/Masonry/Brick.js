import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'



const propTypes = {
  x: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  y: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  w: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  h: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  padding: PropTypes.number
};

const defaultProps = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  padding: 0
};

class Brick extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const
      { children, padding, x, y, w, h } = this.props,
      inlineStyle = {
        padding,
        top: y,
        left: x,
        width: w,
        height: h,
      };

    return (
      <div className="masonry-brick" style={inlineStyle}>
        {children}
      </div>
    )
  }
}

Brick.propTypes = propTypes;
Brick.defaultProps = defaultProps;

export default Brick;
