import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

class Modal extends Component {
  constructor() {
    super(...arguments);
    this.mounted = true;
    this.clickOverlay = this.clickOverlay.bind(this);
    this.closeModalKeyUpEscape = this.closeModalKeyUpEscape.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click',this.clickOverlay, false);
    document.addEventListener('keyup',this.closeModalKeyUpEscape, false);
  }

  componentWillUnmount () {
    this.mounted = false;
    document.removeEventListener('keyup',this.closeModalKeyUpEscape, false);
    document.removeEventListener('click', this.clickOverlay, false);
  }

  render() {
    const { maxWidth, title, body, footer, isOpen} = this.props;
    return(
      <Transition in={isOpen} timeout={1300}
                  unmountOnExit={true}>
        <div className="fixed-overlay" >
          <div className="modal-container" ref='modal'
               style={(maxWidth)? {maxWidth: maxWidth}: {}}>
            <div className="modal-container_content">
              {(title) ?
                <div className="modal-container_content-header">
                  <h4 className="modal-container_content-header__title">{title}</h4>
                  <div className="modal-container_content-header-close" onClick={e => close()}>

                  </div>
                </div>:null}
              <div className="modal-container_content-body">
                {body}
              </div>
              {(footer) ?
                <div className="modal-container_content-footer">
                  {footer}
                </div> : null}
            </div>
          </div>
        </div>
      </Transition>
    );
  }

  closeModalKeyUpEscape(event) {
    const { close } = this.props;
    if (this.mounted) {
      if ((event.keyCode === 27)) {
        close();
      }
    }
  }

  clickOverlay(event) {
    const { close } = this.props;
    if (this.mounted) {
      if (event.target.className == 'fixed-overlay' ) {
        close();
      }
    }
  }
}

Modal.propTypes = {
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  body: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.string,
  close: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
  isOpen: PropTypes.bool.isRequired
};