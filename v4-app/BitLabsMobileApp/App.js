import React, { Component } from 'react';
import { Main } from './src/components/Main'
import { WebSocketContext, webSocketManager } from './src/contexts/WebSocketContext'
import { ControlModeContext, EffectSelection } from './src/contexts/ControlModeContext';

export default class App extends Component {


  render() {
    return (
      <ControlModeContext.Provider value={{ mode: EffectSelection }}>
        <WebSocketContext.Provider value={{ wsm: webSocketManager }}>
          <Main />
        </WebSocketContext.Provider>
      </ControlModeContext.Provider>
    );
  }
}