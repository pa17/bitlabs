import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';

import { DangerZone, Svg } from 'expo';
const { DeviceMotion } = DangerZone;
const { Circle, Rect, G, Mask } = Svg;

// TODO: Performance issues: FPS significantly reduced since adding of tilt indication rectangles and masking

let smallRadius = 57;
let bigRadius = 200;

let alpha, beta, gamma, alphaScaled, betaScaled, gammaScaled  = 0;
let minAngles, maxAngles, scaledAngles = {
  alpha: 0,
  beta: 0,
  gamma: 0
}

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class DeviceMotionSensor extends React.Component {
  state = {
    axisSelect: 'X',
    deviceMotionData: {},
    effectSelect: [false, false, false, false, false, false, false, false, false, false],
    effectToggle: false
  };

  _selectEffect = (index) => {
    let buttonsActive = [false, false, false, false, false, false, false, false, false, false];
    buttonsActive[index] = true;
    this.setState({effectSelect: buttonsActive});
  }

  _toggleEffect = () => {
    this.setState({effectToggle: !this.state.effectToggle});
    // TODO: Implement functionality of effect toggling -> Show the angles achieved, get ready to be sent
  }

  componentDidMount() {
    this._toggle();
    DeviceMotion.setUpdateInterval(16); 
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
      this.setState({axisSelect: 'Y'});
    }
    else {
      this.setState({axisSelect: 'X'});
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
    let rotationData = this.state.deviceMotionData.rotation;

    if (rotationData != null){
      alpha = rotationData.alpha;
      beta = rotationData.beta;
      gamma = rotationData.gamma;

      let scaledRotationData = scaleAngles(this.state.deviceMotionData.rotation);

      alphaScaled = scaledRotationData.alpha;
      betaScaled = scaledRotationData.beta;
      gammaScaled = scaledRotationData.gamma;
    }

    return (
      <View style={styles.background}>
        <View style={styles.body}>
          <Text style={styles.text}>Device Motion:</Text>
          <Text style={styles.text}>
            Alpha: {toDeg(alpha)} Beta: {toDeg(beta)} Gamma: {toDeg(gamma)}
          </Text>
          <Text style={styles.text}>
            S.Alpha: {toTwoDec(alphaScaled)} S.Beta: {toTwoDec(betaScaled)} S.Gamma: {toTwoDec(gammaScaled)}
          </Text>

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

          {/* BITLABS LOGO
          <View style={styles.logoContainer}>
            <Image source={require('./img/logo.png')} />
          </View> */}

        </View>
        <Svg
          height="100%"
          width="100%"
        >

          {/* MOVABLE CIRCLE
          <Circle
            cx={toDeg(gamma) + deviceWidth/2}
            cy={toDeg(beta) + 100}
            r="20"
            fill="pink"
            onPress={() => alert('Press on Circle')}
          /> */}

          {/* MASKING A RECT EAT LOADS OF PERFORMANCE */}
          <Mask id="Mask" maskUnits="userSpaceOnUse" width="400" height="400">
            <Circle cx="162" cy="185" r='150' fill='slategray'/>
          </Mask>

          <G
            id="UIAngleIndicator"
          >
              <Rect
                x="0"
                y="0"
                width={this.state.axisSelect === 'X' ? '0' : deviceWidth * gammaScaled}
                height="400"
                fill="white"
                fillOpacity="0.2"
                mask="url(#Mask)"
              />

              {/* <Rect
                x="0"
                y="0"
                width="400"
                height={this.state.axisSelect === 'Y' ? '0' : deviceHeight * betaScaled}
                fill="white"
                fillOpacity="0.2"
                mask="url(#Mask)"
              /> */}
            </G>

            <G
              id="UIButtonContainer"
              scale="0.3"
              transform="translate(125,200)"
            >
              <Circle cx="407.47" cy="57.08" r={smallRadius}
                fill={this.state.effectSelect[0] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(0)}/>
              <Circle cx="188.68" cy="134.35" r={smallRadius}
                fill={this.state.effectSelect[1] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(1)}/>
              <Circle cx="57.09" cy="325.47" r={smallRadius}
                fill={this.state.effectSelect[2] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(2)}/>
              <Circle cx="62.97" cy="557.43" r={smallRadius}
                fill={this.state.effectSelect[3] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(3)}/>
              <Circle cx="204.07" cy="741.64" r={smallRadius}
                fill={this.state.effectSelect[4] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(4)}/>
              <Circle cx="426.5" cy="807.73" r={smallRadius}
                fill={this.state.effectSelect[5] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(5)}/>
              <Circle cx="645.29" cy="730.45" r={smallRadius}
                fill={this.state.effectSelect[6] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(6)}/>
              <Circle cx="776.88" cy="539.34" r={smallRadius}
                fill={this.state.effectSelect[7] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(7)}/>
              <Circle cx="771" cy="307.37" r={smallRadius}
                fill={this.state.effectSelect[8] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(8)}/>
              <Circle cx="629.9" cy="123.17" r={smallRadius}
                fill={this.state.effectSelect[9] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(9)}/>
              <Circle cx="416.99" cy="432.4" r={bigRadius}
                fill={this.state.effectToggle ? 'salmon' : 'seashell'} 
                onPress={() => this._toggleEffect()}
                onLongPress={() => alert('Long press on Rect')}
              />
            </G>
        </Svg>
      </View>
    );
  }
}

function scaleAngles(data) {

  if (minAngles != undefined && maxAngles != undefined) {
    if (data['beta'] >=  minAngles['beta'] && data['beta'] <= maxAngles['beta'] && maxAngles['beta'] > minAngles['beta']) {
      scaledAngles['beta'] = Math.abs(data['beta'] - minAngles['beta']) / Math.abs(maxAngles['beta'] - minAngles['beta']);
    }
    else if (data['beta'] >=  maxAngles['beta'] && data['beta'] <= minAngles['beta'] && minAngles['beta'] > maxAngles['beta']) {
      scaledAngles['beta'] = Math.abs(data['beta'] - minAngles['beta']) / Math.abs(maxAngles['beta'] - minAngles['beta']);
    }
    if (data['gamma'] >=  minAngles['gamma'] && data['gamma'] <= maxAngles['gamma'] && maxAngles['gamma'] > minAngles['gamma']) {
      scaledAngles['gamma'] = Math.abs(data['gamma'] - minAngles['gamma']) / Math.abs(maxAngles['gamma'] - minAngles['gamma']);
    }
    else if (data['gamma'] >=  maxAngles['gamma'] && data['gamma'] <= minAngles['gamma'] && minAngles['gamma'] > maxAngles['gamma']) {
      scaledAngles['gamma'] = Math.abs(data['gamma'] - minAngles['gamma']) / Math.abs(maxAngles['gamma'] - minAngles['gamma']);
    }
    if (data['alpha'] >=  minAngles['alpha'] && data['alpha'] <= maxAngles['alpha'] && maxAngles['alpha'] > minAngles['alpha']) {
      scaledAngles['alpha'] = Math.abs(data['alpha'] - minAngles['alpha']) / Math.abs(maxAngles['alpha'] - minAngles['alpha']);
    }
    else if (data['alpha'] >=  maxAngles['alpha'] && data['alpha'] <= minAngles['alpha'] && minAngles['alpha'] > maxAngles['alpha']) {
      scaledAngles['alpha'] = Math.abs(data['alpha'] - minAngles['alpha']) / Math.abs(maxAngles['alpha'] - minAngles['alpha']);
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