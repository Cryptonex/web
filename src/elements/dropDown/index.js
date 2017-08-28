import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      value: this.props.value || ''
    };
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click',this.handleDocumentClick, false);
    document.addEventListener('touched', this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touched', this.handleDocumentClick, false)
  }

  render() {
    const {dropContent, value, options} = this.props;
    return (
      <div className={classNames({
        dropdown: true,
        open: this.state.isOpen,
      })}
           onClick={this.toggleDropdown.bind(this)}>
        <div className="dropdown__triger">
          <div className="dropdown__triger-title">
            {this.state.value}
          </div>
        </div>
        <div className="dropdown__content">
          {options.map((item, index) => {
            return(
              <a key={index} onClick={this.elementClick.bind(this, item)}>{item.name}</a>
            )
          })}
        </div>
      </div>
    );
  }

  toggleDropdown(e) {
    this.setState({'isOpen': !this.state.isOpen});
  }

  elementClick(item, ev) {
    let state = Object.assign({}, this.state);
    state.value = item.name;
    this.setState(state);
  }



  handleDocumentClick(event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({ isOpen: false })
      }
    }
  }

}

DropDown.defaultProps = {
  value:'All',
  options: [{value:'', title: ''}],
  onChange: (value) => {
    console.log(value);
  },
};

DropDown.PropTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string
};