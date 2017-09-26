import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styl from './scroll.styl';
import ReactDOM from 'react-dom';
import className from 'classnames';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  offset: PropTypes.number,
  padding: PropTypes.string,
  shadow: PropTypes.string,
  showTrack: PropTypes.bool
};

const defaultProps = {
  width: 0,
  height: 0,
  offset: 4,
  padding: '0',
  showTrack: true
};


class Scrollbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0, height: 0,
      maxWidth: 0, maxHeight: 0,
      startX: 0, startY: 0,
      offsetX: 0, offsetY: 0,
      sizeX: 0, sizeY: 0,
      shadowTop: { background: `linear-gradient(to top, rgba(${this.props.shadow},0) 0, rgba(${this.props.shadow},1) 95%)` },
      shadowBottom: { background: `linear-gradient(to bottom, rgba(${this.props.shadow},0) 0, rgba(${this.props.shadow},1) 95%)` },
      showShadowTop: false, showShadowBottom: false,
      touch: false,
      visibility: false,
      display: false
    };

    this.startWatch = this.startWatch.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.updateScrollbar = this.updateScrollbar.bind(this);
  }

  componentDidMount() {
    setTimeout(function () {
      this.updateScrollbar()
    }.bind(this), 0);

    this.observer = new MutationObserver(this.updateScrollbar);

    let observerConfig = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    };

    let node = ReactDOM.findDOMNode(this);
    this.observer.observe(node, observerConfig);

    window.addEventListener('resize', this.updateScrollbar);
  }

  componentWillUnmount() {
    this.observer.disconnect();
    window.removeEventListener('resize', this.updateScrollbar);
  }

  get ratio() {
    return this.refs.content.scrollHeight / this.refs.track.scrollHeight || 1;
  }

  calculateSize(node) {
    const size = { width: 0, height: 0 };

    node.forEach(function (el) {
      size.width += el.offsetWidth;
      size.height += el.offsetHeight;
    });

    return size;
  }

  updateScrollbar() {
    const
      wrapper = ReactDOM.findDOMNode(this),
      parent = wrapper.parentNode,
      prop = this.props,
      content = this.refs.content,
      size = this.calculateSize(content.childNodes);

    const
      width = prop.width > parent.clientWidth ? prop.width : 'auto',
      height = prop.height > size.height ? 'auto' : parent.clientHeight,
      maxWidth = prop.width ? prop.width : '100%',
      maxHeight = prop.height ? prop.height : '100%';

    this.setState({
      width: width,
      height: height,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      sizeY: content.clientHeight / this.ratio,
      offsetY: content.scrollTop / this.ratio,
      showShadowTop: content.scrollTop > 0,
      showShadowBottom: content.scrollHeight ?
        content.scrollTop < content.scrollHeight - this.state.sizeY * this.ratio : true,
      display: content.scrollHeight > content.clientHeight
    });
  }

  startDrag(event) {
    event.preventDefault();
    event.stopPropagation();

    const
      e = event.changedTouches ? event.changedTouches[0] : event;

    this.setState({
      startX: e.clientX,
      startY: e.clientY,
      touch: true
    });

    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('touchmove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
    document.addEventListener('touchend', this.stopDrag);
  }

  stopDrag(event) {
    this.setState({
      touch: false
    });

    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('touchmove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
    document.removeEventListener('touchend', this.stopDrag);
  }

  onDrag(event) {
    if (this.state.touch) {
      event.preventDefault();
      event.stopPropagation();

      const
        e = event.changedTouches ? event.changedTouches[0] : event,
        next = (e.clientY - this.state.startY) * this.ratio;

      this.setState({
        startY: e.clientY
      }, () => {
        this.refs.content.scrollTop += next;

        this.updateScrollbar();
      });
    }
  }

  onScroll(event) {
    const
      content = this.refs.content,
      min = 0,
      max = content.scrollHeight - this.state.sizeY * this.ratio,
      step = event.deltaY > 0 ? 100 : -100,
      next = content.scrollTop + step,
      clamp = next < min ? min : next > max ? max : next;

    if (content.scrollTop != clamp) {
      event.preventDefault();
      event.stopPropagation();
    }

    content.scrollTop += step;

    this.updateScrollbar();
  }

  startWatch() {
    this.setState({
      visibility: true
    });
  }

  stopWatch() {
    this.setState({
      visibility: false
    });
  }

  render() {

    let areaClasses = className({
      'scrollbar-area': true,
      show: this.state.visibility,
      touched: this.state.touch
    });

    let style = {
      width: this.state.width,
      height: this.state.height,
      maxWidth: this.state.maxWidth,
      maxHeight: this.state.maxHeight,
      padding: this.props.padding,
    };

    return (
      <div className={areaClasses} onMouseEnter={this.startWatch} onMouseLeave={this.stopWatch}>
        {
          this.state.shadowTop && this.state.showShadowTop ?
            <div className="scrollbar-shadow-top" style={this.state.shadowTop}></div> : null
        }

        {
          this.state.shadowBottom && this.state.showShadowBottom ?
            <div className="scrollbar-shadow-bottom" style={this.state.shadowBottom}></div> : null
        }

        <div ref="content" className="scrollbar-content" style={style} onWheel={this.onScroll}>
          {this.props.children}
        </div>

        <div ref="track" className="scrollbar-box" style={{ top: this.props.offset, bottom: this.props.offset, right: this.props.offset }}>
          <div className="scrollbar-track" style={{ display: this.state.display ? 'block' : 'none' }}>
            <div className={`scrollbar-region ${this.props.showTrack ? 'scrollbox-slider' : ''}`}></div>
            <div className="scrollbar-thumb" style={{ height: this.state.sizeY, top: this.state.offsetY }}
                 onMouseDown={this.startDrag}></div>
          </div>
        </div>
      </div>
    )
  }
}

Scrollbar.propTypes = propTypes;

Scrollbar.defaultProps = defaultProps;

export default Scrollbar;