import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';

import { DangerZone, Svg } from 'expo';
const { DeviceMotion } = DangerZone;
const { Circle, Rect } = Svg;

let alpha, beta, gamma = 0;

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class DeviceMotionSensor extends React.Component {
  state = {
    deviceMotionData: {},
  };

  componentDidMount() {
    this._toggle();
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

  _slow = () => {
    DeviceMotion.setUpdateInterval(500); 
    console.log("Setting Update Interval to 1000");
  };

  _fast = () => {
    DeviceMotion.setUpdateInterval(16); 
    console.log("Setting Update Interval to 16");
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
    let rotationData = this.state.deviceMotionData.rotation;

    if (rotationData != null){
      alpha = rotationData.alpha;
      beta = rotationData.beta;
      gamma = rotationData.gamma;
    }

    return (
      <View style={styles.background}>
        <View style={styles.body}>
          <Text style={styles.text}>Device Motion:</Text>
          <Text style={styles.text}>
            Alpha: {toDeg(alpha)} Beta: {toDeg(beta)} Gamma: {toDeg(gamma)}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this._toggle} style={styles.button}>
              <Text>Toggle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
              <Text>Slow</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._fast} style={styles.button}>
              <Text>Fast</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.logoContainer}>
            <Image source={require('./img/logo.png')} />
          </View> */}
        </View>
        <Svg
          height="100%"
          width="100%"
        >
          <Circle
            cx={toDeg(gamma) + deviceWidth/2}
            cy={toDeg(beta) + 200}
            r="20"
            fill="pink"
            onPress={() => alert('Press on Circle')}
          />
        </Svg>
      </View>
    );
  }
}

function toDeg(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 180.0 / Math.PI);
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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