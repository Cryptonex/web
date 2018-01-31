import React, { Component } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import style from './style';

import Pane from './pane';

const propTypes = {
  placement: PropTypes.string,
  selected: PropTypes.number,
  onSwitch: PropTypes.func
};

const defaultProps = {
  placement: 'top',
  selected: 0,
  onSwitch: null
};

class Tabs extends Component {
  constructor() {
    super(...arguments);

    const { selected } = this.props;

    this.state = {
      index: selected
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const state = { ...this.state };
    const { onSwitch } = this.props;
    if (state.index !== nextState.index) {
      if(typeof onSwitch === 'function') {
        onSwitch(nextState.index);
      }
    }
  }

  onSwitch = (id, onClick) => {
    this.setState({ index: id });
  };

  render() {
    const { index } = this.state;
    const { children, placement } = this.props;

    return (
      <div className={`tabs ${placement}`}>
        <div className="tab-menu">
          {
            React.Children.map(children, ((el, i) => {
              const linkClass = className({
                'tab-link': true,
                'active': i === index
              });

              const onClick = el.props.onClick;
              return (
                <div
                  key={i}
                  className={linkClass}
                  onClick={e => this.onSwitch(i, onClick)}
                >
                  {el.props.label}
                </div>
              );
            }))
          }
        </div>
        {
          React.Children.map(children, ((el, i) => {
            if (index == i) {
              return el;
            }
          }))
        }
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export { Tabs, Pane };
