import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './style.styl';

import className from 'classnames';
import Scrollbar from 'elements/scrollbar';


const propTypes = {
  options: PropTypes.array,
  height: PropTypes.number,
  search: PropTypes.number,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func
};

const defaultProps = {
  options: [],
  height: 200,
  search: 5,
  placeholder: 'Поиск...',
  onSelect: null
};

class Select extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      display: false,
      option: null
    };

    this.onToggle = this.onToggle.bind(this);
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
    if (this.refs.search) {
      if (!ReactDOM.findDOMNode(this.refs.search).contains(e.target)) {
        return this.onHide();
      }
    }

    this.onHide()

  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClickOutside)
  }

  selectOption(el) {
    const { onSelect } = this.props;

    if (onSelect !== null) {
      onSelect(el);
    }

    this.setState({ option: el })
  }

  render() {
    const { display, option } = this.state;
    const { children, value, options, height, search, placeholder } = this.props;

    return (
      <div className={className({
        'select': true,
        'show': display
      })}>
        <div className="select-trigger" onClick={this.onToggle}>
          {
            !option ?
              <div className="select-trigger--selected">
                {(typeof value === 'string') ? value : value.name}
              </div>
              : <div className="select-trigger--selected">{option.name}</div>
          }
        </div>
        {
          options.length ?
            <div className="select-content">
              {
                options.length > search ?
                  <div className="select-search" ref="search">
                    <input type="text" placeholder={placeholder} />
                  </div>
                  : null
              }
              <Scrollbar height={height}>
                <ul>
                  {
                    options.map((el, i) => {
                      return (
                        <li key={el.uuid}>
                          <button onClick={this.selectOption.bind(this, el)}>{el.name}</button>
                        </li>
                      )
                    })
                  }
                </ul>
              </Scrollbar>
            </div>
            : null
        }
      </div>
    )
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
