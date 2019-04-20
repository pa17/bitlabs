import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';

import { DangerZone, Svg } from 'expo';
const { DeviceMotion } = DangerZone;
const { Circle, Rect, G, Mask } = Svg;

let smallRadius = 57;
let bigRadius = 200;

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
    effectToggle: false,
    xActive: false,
    yActive: false,
  };

  _selectEffect = (index) => {
    let buttonsActive = [false, false, false, false, false, false, false, false, false, false];
    buttonsActive[index] = true;
    this.setState({effectSelect: buttonsActive});
  }

  _toggleEffect = () => {
    // TODO: Implement functionality of effect toggling -> Show the angles achieved, get ready to be sent
    // console.log("Axis Select: " + this.state.axisSelect + ", Effect Toggle: " + this.state.effectToggle);
    if (this.state.axisSelect === 'X' && !this.state.effectToggle) {
      this.setState({xActive: true, yActive: false})
    }
    else if (this.state.axisSelect === 'Y' && !this.state.effectToggle) {
      this.setState({xActive: false, yActive: true})
    }
    else {
      this.setState({xActive: false, yActive: false})
    }

    this.setState({effectToggle: !this.state.effectToggle});
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
    if (this.state.deviceMotionData.rotation != null){
      scaleAngles(this.state.deviceMotionData.rotation);
    }

    return (
      <View style={styles.background}>
        <View style={styles.body}>
          <Text style={styles.text}>Device Motion:</Text>
          {/* <Text style={styles.text}>
            Alpha: {toDeg(alpha)} Beta: {toDeg(beta)} Gamma: {toDeg(gamma)}
          </Text> */}
          <Text style={styles.text}>
            S.Alpha: {toTwoDec(scaledAngles.alpha)} S.Beta: {toTwoDec(scaledAngles.beta)} S.Gamma: {toTwoDec(scaledAngles.gamma)}
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
        </View>

        <Svg
          height="65%"
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
            <Circle cx="160" cy="189" r='150' fill='slategray'/>
          </Mask>

          <G
            id="UIAngleIndicator"
          >
              <Rect
                x="0"
                y="0"
                width={this.state.yActive ? deviceWidth * scaledAngles.gamma : '0'}
                height="400"
                fill="white"
                mask="url(#Mask)"
              />

              <Rect
                x="0"
                y={this.state.xActive ? '370' - '370' * scaledAngles.beta : '400'}
                width="400"
                height="400"
                fill="white"
                mask="url(#Mask)"
              />
            </G>

            <G
              id="UIButtonContainer"
              scale="0.3"
              transform="translate(115,200)"
            >
              <Circle cx="416" cy="57" r={smallRadius}
                fill={this.state.effectSelect[0] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(0)}/>
              <Circle cx="195.5" cy="129.2" r={smallRadius}
                fill={this.state.effectSelect[1] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(1)}/>
              <Circle cx="59.6" cy="317.3" r={smallRadius}
                fill={this.state.effectSelect[2] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(2)}/>
              <Circle cx="60.2" cy="549.4" r={smallRadius}
                fill={this.state.effectSelect[3] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(3)}/>
              <Circle cx="197.1" cy="736.7" r={smallRadius}
                fill={this.state.effectSelect[4] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(4)}/>
              <Circle cx="418" cy="807.8" r={smallRadius}
                fill={this.state.effectSelect[5] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(5)}/>
              <Circle cx="638.5" cy="735.6" r={smallRadius}
                fill={this.state.effectSelect[6] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(6)}/>
              <Circle cx="774.4" cy="547.5" r={smallRadius}
                fill={this.state.effectSelect[7] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(7)}/>
              <Circle cx="773.7" cy="315.4" r={smallRadius}
                fill={this.state.effectSelect[8] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(8)}/>
              <Circle cx="636.9" cy="128.1" r={smallRadius}
                fill={this.state.effectSelect[9] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this._selectEffect(9)}/>
              <Circle cx="417" cy="432.4" r={bigRadius}
                fill={this.state.effectToggle ? 'salmon' : 'seashell'} 
                onPress={() => this._toggleEffect()}
                onLongPress={() => alert('Long press on Rect')}
              />
            </G>
        </Svg>

        <View style={styles.logoContainer}>
            <Image source={require('./img/logo.png')} style={{width: 40, height: 60}} />
        </View>

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