import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Select extends Component {

  render() {
    const { value, onChange, options, nameClass} = this.props

    return (
      <select onChange={e => onChange(e.target.value)}
              className={nameClass}
              value={value}>
        {options.map((option, index) =>
          <option value={option.value} key={index}>
            {option.name}
          </option>)
        }
      </select>
    )
  }
}


Select.defaultProps = {
  value:'',
  options: [{value:'', title: ''}],
  onChange: (value) => {
    console.log(value);
  },
  nameClass: 'form'
};

Select.propTypes = {
  options: PropTypes.arrayOf( PropTypes.object.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  nameClass: PropTypes.string,
};