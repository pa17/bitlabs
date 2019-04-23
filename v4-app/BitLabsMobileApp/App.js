import React, { Component } from 'react';
import {DeviceMotionSensor} from './src/components/Main'
import { WebSocketContext, WebSocketManager } from './src/contexts/WebSocketContext'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.WebSocketManager = new WebSocketManager('192.168.0.15');
  }

  render() {
    return (
      <WebSocketContext.Provider value={{ wsm : this.WebSocketManager }}>
        <DeviceMotionSensor />
      </WebSocketContext.Provider>
    );
  }
}