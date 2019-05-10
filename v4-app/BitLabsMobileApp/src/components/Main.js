// Absolute path to project root folder.
let ROOT = '../..'

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { DangerZone } from 'expo';
const { DeviceMotion } = DangerZone;

import { webSocketManager } from '../contexts/WebSocketContext';
import { ControlWheel } from './UI/ControlWheel';

let minAngles, maxAngles, scaledAngles = {
  alpha: 0,
  beta: 0,
  gamma: 0
}

export class Main extends React.Component {
  state = {
    axisSelect: 'X',
    effectAmountX: 0,
    effectAmountY: 0,
    deviceMotionData: {},
  };

  componentDidMount() {
    this._subscribe();
    DeviceMotion.setUpdateInterval(50);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _selectAxis = () => {
    switch (this.state.axisSelect) {
      case 'X':
        this.setState({ axisSelect: 'Y' });
        break;
      case 'Y':
        this.setState({ axisSelect: 'X & Y' });
        break;
      case 'X & Y':
        this.setState({ axisSelect: 'X' });
        break;
    }
  }

  _min = () => {
    minAngles = this.state.deviceMotionData.rotation;
  };

  _max = () => {
    maxAngles = this.state.deviceMotionData.rotation;
  };

  _subscribe = () => {
    this._subscription = DeviceMotion.addListener(
      deviceMotionData => {
        this.setState({ deviceMotionData });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    if (this.state.deviceMotionData.rotation != null) {
      scaleAngles(this.state.deviceMotionData.rotation);
    }


    switch (this.state.axisSelect) {
      case 'X':
        webSocketManager.sendAxisSelected('beta');
        this.state.effectAmountX = scaledAngles.beta;
        this.state.effectAmountY = 0;
        break;
      case 'Y':
        webSocketManager.sendAxisSelected('gamma')
        this.state.effectAmountY = scaledAngles.gamma;
        this.state.effectAmountX = 0;
        break;
      case 'X & Y':
        webSocketManager.sendAxisSelected('both')
        this.state.effectAmountX = scaledAngles.beta;
        this.state.effectAmountY = scaledAngles.gamma;
        break;
    }

    // Send motion data to server!
    webSocketManager.sendMotionData(scaledAngles);

    return (
      <View style={styles.background}>


        <ControlWheel
          axisSelect={this.state.axisSelect}
          effectAmountX={this.state.effectAmountX}
          effectAmountY={this.state.effectAmountY}
        />

        <View style={styles.body}>
          {/* <Text style={styles.title}>OrBit by BitLabs</Text>
          <Text style={styles.text}>
            S.Alpha: {toTwoDec(scaledAngles.alpha)} S.Beta: {toTwoDec(scaledAngles.beta)} S.Gamma: {toTwoDec(scaledAngles.gamma)}
    </Text> */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this._selectAxis} style={[styles.button, styles.leftButton]}>
              <Text style={styles.text}>{this.state.axisSelect}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._min} style={[styles.button, styles.middleButton]}>
              <Text style={styles.text}>Min</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._max} style={[styles.button, styles.rightButton]}>
              <Text style={styles.text}>Max</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );

  }
}

function scaleAngles(data) {

  if (minAngles != undefined && maxAngles != undefined) {
    if (data['beta'] >= minAngles['beta'] && data['beta'] <= maxAngles['beta'] && maxAngles['beta'] > minAngles['beta']) {
      scaledAngles['beta'] = Math.abs(data['beta'] - minAngles['beta']) / Math.abs(maxAngles['beta'] - minAngles['beta']);
    }
    else if (data['beta'] >= maxAngles['beta'] && data['beta'] <= minAngles['beta'] && minAngles['beta'] > maxAngles['beta']) {
      scaledAngles['beta'] = Math.abs(data['beta'] - minAngles['beta']) / Math.abs(maxAngles['beta'] - minAngles['beta']);
    }
    if (data['gamma'] >= minAngles['gamma'] && data['gamma'] <= maxAngles['gamma'] && maxAngles['gamma'] > minAngles['gamma']) {
      scaledAngles['gamma'] = Math.abs(data['gamma'] - minAngles['gamma']) / Math.abs(maxAngles['gamma'] - minAngles['gamma']);
    }
    else if (data['gamma'] >= maxAngles['gamma'] && data['gamma'] <= minAngles['gamma'] && minAngles['gamma'] > maxAngles['gamma']) {
      scaledAngles['gamma'] = Math.abs(data['gamma'] - minAngles['gamma']) / Math.abs(maxAngles['gamma'] - minAngles['gamma']);
    }
  }

  return scaledAngles;
}

function toTwoDec(n) {
  return Math.round(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  background: {
    flex: 1,
    backgroundColor: 'silver',
  },

  body: {
    paddingHorizontal: 10,
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgray',
    padding: 10,
  },

  leftButton: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },

  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'gray',
  },

  rightButton: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },

  text: {
    color: 'black',
  },
});