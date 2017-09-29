import React, { Component } from 'react'
import PropTypes from 'prop-types';
import className from 'classnames';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';

import Scrollbar from 'elements/scrollbar/index'
import { EE } from './emitter';
import style from './style.styl';


class Popup extends Component {
  constructor() {
    super(...arguments)
  }

  componentDidMount() {
    const { create, close, closeAll } = this.props;
    EE.on('create/modal', content => create(content));
    EE.on('close/modal', type => close(type));
  }

  componentWillUnmount() {
    EE.off('create/modal');
    EE.off('close/modal');
  }

  render() {
    const { popups } = this.props;
    return (
      <div className={className({ 'popup-list': true, 'overlay': popups.length })}>
        {
          popups.length ?
            <Scrollbar padding="2rem">
              <TransitionGroup className="modal-outer">
                {
                  popups.map((el, index) => {
                    if (index == popups.length - 1)
                      return (
                      <Transition timeout={{ enter: 300, exit: 250 }} key={index}>
                        {(state) => (
                          React.cloneElement(el.content, {
                            modalState: {
                              className: state ? state: '',
                              id: el.id
                            }
                          })
                        )}
                        </Transition>
                      );
                  })
                }
              </TransitionGroup>
            </Scrollbar> : null
        }
      </div>
    )
  }
}

export default Popup;
