import React, { Component } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import style from './style.styl';

const propTypes = {
  placement: PropTypes.string,
  index: PropTypes.number
};

const defaultProps = {
  placement: 'top',
  index: 0
};

class Tabs extends Component {
  constructor() {
    super(...arguments);

    const { index } = this.props;

    this.state = {
      index: index
    };
  }

  onSwitch(num) {
    this.setState({ index: num });
  }

  render() {
    const { index } = this.state;
    const { children, placement } = this.props;

    return (
      <div className={`tabs ${placement}`}>
        <div className="tab-menu">
          {
            children.length ?
              children.map((el, i) => {
                const _show = className({
                  'tab-link': true,
                  'active': i == index
                });

                return (
                  <div className={_show} key={i} onClick={this.onSwitch.bind(this, i)}>
                    {el.props.label}
                  </div>
                )
              })
              : null
          }
        </div>
        {
          React.Children.map(children, ((el, i) => {
            if (index == i)
              return el;
          }))
        }
      </div>
    )
  }
}

class Tab extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="tab-content">
        {children}
      </div>
    )
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export { Tabs, Tab };