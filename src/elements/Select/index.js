import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './style.styl';

import className from 'classnames';
import Scrollbar from '@/Scrollbar';


const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  maxHeight: PropTypes.number,
  filter: PropTypes.bool,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  multi: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  values: PropTypes.array,
  nameClass: PropTypes.string
};

const defaultProps = {
  options: [],
  maxHeight: 200,
  filter: false,
  placeholder: 'Search...',
  onSelect: null,
  multi: false,
  value: '',
  values: [],
  nameClass: 'default'
};

class Select extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      display: false,
    };

  }

  componentDidMount() {
    this.selectOption = this.selectOption.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onClickRemoveMultiListElement = this.onClickRemoveMultiListElement.bind(this);
    document.addEventListener('mouseup', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClickOutside)
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



  selectOption(value) {
    const { onSelect, multi, values } = this.props;
    if (onSelect !== null && !multi) {
      onSelect(value);
    }

    if (multi) {
      const newValues = [...values];

      if (newValues.includes(value)) {
        const index = values.findIndex((item) => item === value);
        newValues.splice(index, 1);
      } else {
        newValues.push(value);
      }

      if (onSelect !== null) {
        onSelect(newValues);
      }
    }
  }

  onClickRemoveMultiListElement(ev, index) {
    ev.stopPropagation();
    const { values, onSelect } = this.props;
    const newValues = [...values];
    newValues.splice(index, 1);
    if (onSelect !== null) {
      onSelect(newValues);
    }
  }

  renderTrigger() {
    const { display } = this.state;
    const { value, options } = this.props;
    const option = options.filter((option) => option.value === value)[0] || options[0];
    return (
      <div className='select-trigger' onClick={this.onToggle}>
        <div className='select-trigger__selected'>
          <span>{(typeof option === 'object') ? option.name : ''}</span>
        </div>
      </div>
    );
  }

  renderMultiTrigger() {
    const { options, values } = this.props;
    return (
      <div className='select-trigger' onClick={this.onToggle}>
        <ul className='select-trigger__list'>
          {values.map((value, index) => {
            const indexOption = options.findIndex((option) => option.value === value);
            if (indexOption !== -1) {
              return (
                <li key={value}>
                  <span>{options[indexOption].name}</span>
                  <i className="material-icons" onClick={(e) => this.onClickRemoveMultiListElement(e, index)}>
                    close
                  </i>
                </li>
              );
            }
          })}
        </ul>
      </div>
    )
  }

  renderFilter() {
    const { placeholder } = this.props;
    return (
      <div className="select-search" ref="search">
        <input type="text" placeholder={placeholder} />
      </div>
    );
  }

  renderListOption() {
    const { options, maxHeight } = this.props;
    return (
      <Scrollbar height={maxHeight}>
        <ul>
          {
            options.map((option, index) => {
              const
                { multi, value, values} = this.props;

              let buttonClass = option.value === value ? 'selected': '';
              if (multi) {
                buttonClass = (values.includes(option.value)) ? 'selected': '';
              }

              return (
                <li key={index}>
                  <button
                    className={buttonClass}
                    onClick={(e) => this.selectOption(option.value)}
                  >
                    {option.name}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </Scrollbar>
    );
  }

  render() {
    const
      { display } = this.state,
      { filter, options, multi, nameClass } = this.props,
      selectClass = className({
        select: true,
        show: display,
        [nameClass]: true,
      });

    return (
      <div className={selectClass}>
        {(multi) ? this.renderMultiTrigger(): this.renderTrigger()}
        {(filter) ? this.renderFilter(): null }
        <div className="select-content">
          {options.length !== 0 ? this.renderListOption(): null}
        </div>
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
