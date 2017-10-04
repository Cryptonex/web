import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import style from './style.styl';
import { EE } from './emitter';
import AlertCart from './cart';

const propTypes = {
  list: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  closeAll: PropTypes.func.isRequired
};

class Alerts extends Component {

  constructor() {
    super(...arguments)
  }

  componentDidMount() {
    const { add, close, closeAll } = this.props;
    EE.on('create/alert_info', props => add('info', props.message, props.lifetime));
    EE.on('create/alert_warning', props => add('warning', props.message, props.lifetime));
    EE.on('create/alert_success', props => add('success', props.message, props.lifetime));
    EE.on('create/alert_danger', props => add('danger', props.message, props.lifetime));
    EE.on('close/alert', id => close(id));
    EE.on('close/alert_all',() => closeAll());
  }


  componentWillUnmount() {
    EE.off('create/alert_info');
    EE.off('create/alert_warning');
    EE.off('create/alert_success');
    EE.off('create/alert_danger');
    EE.off('close/alert');
    EE.off('close/alert_all');
  }

  render() {
    const { list, closeAll } = this.props;

    return (
      <TransitionGroup className="alerts">
        {
          list.map((el) => {
            return (
              <Transition timeout={{ enter: 500, exit: 250 }} key={el.id}>
                {(state) => (
                  <AlertCart id={el.id} type={el.type} message={el.message}
                    lifetime={el.lifetime} effect={`alert-${state}`} />
                )}
              </Transition>
            )
          })
        }

        {
          list.length > 1 ?
            <Transition timeout={0}>
              <button className="button button-block button-tint button-primary" onClick={() => closeAll()}>
                Закрыть все
              </button>
            </Transition>
            : null
        }
      </TransitionGroup>
    )
  }
}

Alerts.propTypes = propTypes;

export default Alerts;