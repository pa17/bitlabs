// Absolute path to project root folder.
let ROOT = '../..'

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { DangerZone } from 'expo';
const { DeviceMotion } = DangerZone;

import {webSocketManager} from '../contexts/WebSocketContext';
import { ControlWheel } from './UI/ControlWheel';
import { ControlModeContext } from '../contexts/ControlModeContext';


let minAngles, maxAngles, scaledAngles = {
  alpha: 0,
  beta: 0,
  gamma: 0
}

export class Main extends React.Component {
  state = {
    axisSelect: 'X',
    deviceMotionData: {},
    effectToggle: false,
    xActive: false,
    yActive: false,
  };

  _toggleEffect = () => {
    // TODO: Implement functionality of effect toggling -> Show the angles achieved, get ready to be sent
    // console.log("Axis Select: " + this.state.axisSelect + ", Effect Toggle: " + this.state.effectToggle);
    if (this.state.axisSelect === 'X' && !this.state.effectToggle) {
      this.setState({ xActive: true, yActive: false })
    }
    else if (this.state.axisSelect === 'Y' && !this.state.effectToggle) {
      this.setState({ xActive: false, yActive: true })
    }
    else {
      this.setState({ xActive: false, yActive: false })
    }

    this.setState({ effectToggle: !this.state.effectToggle });
  }

  componentDidMount() {
    this._toggle();
    DeviceMotion.setUpdateInterval(50);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _selectAxis = () => {
    if (this.state.axisSelect === 'X') {
      this.setState({ axisSelect: 'Y' });
    }
    else {
      this.setState({ axisSelect: 'X' });
    }
  }

  _min = () => {
    minAngles = this.state.deviceMotionData.rotation;
    // console.log("New Min Angles: " + minAngles);
  };

  _max = () => {
    maxAngles = this.state.deviceMotionData.rotation;
    // console.log("New Max Angles: " maxAngles);
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

    // Send motion data to server!
    webSocketManager.sendMotionData(scaledAngles);

    return (
          <View style={styles.background}>
            <View style={styles.body}>
              <Text style={styles.text}>Device Motion:</Text>
              <Text style={styles.text}>
                Alpha: {toDeg(scaledAngles.alpha)} Beta: {toDeg(scaledAngles.beta)} Gamma: {toDeg(scaledAngles.gamma)}
              </Text>
              {/* <Text style={styles.text}>
            S.Alpha: {toTwoDec(scaledAngles.alpha)} S.Beta: {toTwoDec(scaledAngles.beta)} S.Gamma: {toTwoDec(scaledAngles.gamma)}
          </Text> */}

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this._selectAxis} style={styles.button}>
                  <Text>{this.state.axisSelect}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._min} style={[styles.button, styles.middleButton]}>
                  <Text>Min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._max} style={styles.button}>
                  <Text>Max</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ControlWheel />

            <View style={styles.logoContainer}>
              <Image source={require(`${ROOT}/img/logo.png`)} style={{ width: 40, height: 60 }} />
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

function toDeg(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 180.0 / Math.PI);
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
    marginTop: 15,
  },
  background: {
    flex: 1,
    backgroundColor: '#38424a',
  },
  body: {
    marginTop: 35,
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  logoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    color: 'white',
  }
});