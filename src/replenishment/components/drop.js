import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import className from 'classnames';


let curMap = [
  {title: 'btc', key: 'btc'},
  {title: 'eth', key: 'eth'}
];


class DropCurrancy extends Component {

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
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
    let currancyMap = curMap.map((item, index) => {
      return (
        <li className="currancy-dropdown__list-item"
            onClick={e => this.props.changeCurrent(item.title)}
          key={index}>
          {item.title}
        </li>
      )
    });
    return (
      <div className={className({
        'currancy': true,
        'open': this.state.isOpen
      })} onClick={this.toggleDropdown.bind(this)}>
        <div className="currancy-current">
          <div className="currancy-current__item">
            {this.props.current}
          </div>
        </div>
        <div className="currancy-dropdown">
          <ul className="currancy-dropdown__list">
            {currancyMap}
          </ul>
        </div>
      </div>
    )
  }

  toggleDropdown(e) {
    this.setState({'isOpen': !this.state.isOpen});
  }



  handleDocumentClick(event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({ isOpen: false })
      }
    }
  }

}

export default DropCurrancy;