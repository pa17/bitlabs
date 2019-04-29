import React, { Component } from 'react';
import { Main } from './src/components/Main'
import { WebSocketContext, webSocketManager } from './src/contexts/WebSocketContext'
import { ControlModeContext, EffectSelection, EffectControl } from './src/contexts/ControlModeContext';

export default class App extends Component {
  
  constructor(props) {
    super(props);

    this.switchControlMode = () => {
      
      if (this.state.mode.id === "EffectSelection") {
          this.setState({mode: EffectControl});
      }
      else if (this.state.mode.id === "EffectControl") {
        this.setState({mode: EffectSelection});
      }
      
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      mode: EffectSelection, // default mode
      switchControlMode: this.switchControlMode,
    };
  }

  render() {
    return (
    // Make sure to pass whole state to ControlModeContext.Provider so that it contains the functions too
    <ControlModeContext.Provider value={this.state}> 
        <WebSocketContext.Provider value={{ wsm: webSocketManager }}>
          <Main />
        </WebSocketContext.Provider>
      </ControlModeContext.Provider>
    );
  }
}