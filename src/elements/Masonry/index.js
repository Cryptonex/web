import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Brick from './Brick';
import style from './style.styl';


const propTypes = {
  columns: PropTypes.number,
  padding: PropTypes.number
};

const defaultProps = {
  columns: 12,
  padding: 0
};

class Masonry extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      bricks: []
    };

    this.generateGrid = this.generateGrid.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.generateGrid()
    }, 10);

    const node = ReactDOM.findDOMNode(this);
    const observerConfig = {
      attributes: true,
      subtree: true
    };

    window.addEventListener('resize', this.generateGrid);
    this.observer = new MutationObserver(this.generateGrid);
    this.observer.observe(node, observerConfig)
  }

  componentWillUnmount() {
    this.observer.disconnect();
    window.removeEventListener('resize', this.generateGrid)
  }

  positionByGrid(grid, el) {
    const props = el.props;
    const area = ReactDOM.findDOMNode(this).scrollWidth;
    const isMobile = area > 500 ? false : true;

    let coord = {
      x: 0,
      y: 0,
      w: isMobile ? this.props.columns : props.width,
      h: isMobile ? this.props.columns / 2 : props.height
    };

    grid.map((el) => {
      while (grid.filter(e => e.x == coord.x && e.y == coord.y).length) {
        coord.x++;
        if (coord.x >= this.props.columns) {
          coord.x = 0;
          coord.y++;
        }
      }
    });

    for (let y = 0; y < coord.h; y++) {
      for (let x = 0; x < coord.w; x++) {
        grid.push({
          x: coord.x + x,
          y: coord.y + y,
          w: coord.w,
          h: coord.h
        });
      }
    }

    return coord;
  }

  generateGrid() {
    const
      { children, columns, padding } = this.props,
      width = ReactDOM.findDOMNode(this).scrollWidth,
      height = ReactDOM.findDOMNode(this).scrollHeight,
      step = height ? 100 / columns : width / columns;

    let
      result = [],
      grid = [];

    React.Children.map(children, (el, index) => {
      const
        pos = this.positionByGrid(grid, el),
        obj = React.cloneElement(el,
          {
            padding,
            key: index,
            x: height ? pos.x * step + '%' : pos.x * step,
            y: height ? pos.y * step + '%' : pos.y * step,
            w: height ? pos.w * step + '%' : pos.w * step,
            h: height ? pos.h * step + '%' : pos.h * step,
          }
        );

      result.push(obj);
    });

    this.setState({ bricks: result });
  }

  render() {
    const
      { bricks } = this.state,
      { padding } = this.props,
      inlineStyle = {
        marginLeft: -padding,
        marginRight: -padding
      };

    return (
      <div className="masonry-layout" style={inlineStyle}>
        {bricks.length ? bricks : null}
      </div>
    )
  }
}

Masonry.propTypes = propTypes;
Masonry.defaultProps = defaultProps;


export { Brick };
export default Masonry;
