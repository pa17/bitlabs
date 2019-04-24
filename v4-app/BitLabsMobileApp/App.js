import React, { Component } from 'react';
import { DeviceMotionSensor } from './src/components/Main'
import { WebSocketContext, WebSocketManager } from './src/contexts/WebSocketContext'
import { ControlModeContext, EffectSelection } from './src/contexts/ControlModeContext';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.WebSocketManager = new WebSocketManager('146.169.153.168');
  }

  render() {
    return (
      <ControlModeContext.Provider value={{ mode: EffectSelection }}>
        <WebSocketContext.Provider value={{ wsm: this.WebSocketManager }}>
          <DeviceMotionSensor />
        </WebSocketContext.Provider>
      </ControlModeContext.Provider>
    );
  }
}