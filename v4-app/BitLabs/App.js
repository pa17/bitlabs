import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';

import { DangerZone, Svg } from 'expo';
const { DeviceMotion } = DangerZone;
const { Circle, Rect, G } = Svg;

let alpha, beta, gamma = 0;

let smallRadius = 57;
let bigRadius = 200;

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class DeviceMotionSensor extends React.Component {
  state = {
    deviceMotionData: {},
    effectSelect: [false, false, false, false, false, false, false, false, false, false],
    effectToggle: false
  };

  selectEffect = (index) => {
    let buttonsActive = [false, false, false, false, false, false, false, false, false, false];
    buttonsActive[index] = true;
    this.setState({effectSelect: buttonsActive});
  }

  toggleEffect = () => {
    this.setState({effectToggle: !this.state.effectToggle});
  }

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
          {/*<Circle
            cx={toDeg(gamma) + deviceWidth/2}
            cy={toDeg(beta) + 100}
            r="20"
            fill="pink"
            onPress={() => alert('Press on Circle')}
          /> */}
          
            <G
              scale="0.3"
              transform="translate(125,200)"
            >
              <Circle cx="407.47" cy="57.08" r={smallRadius}
                fill={this.state.effectSelect[0] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(0)}/>
              <Circle cx="188.68" cy="134.35" r={smallRadius}
                fill={this.state.effectSelect[1] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(1)}/>
              <Circle cx="57.09" cy="325.47" r={smallRadius}
                fill={this.state.effectSelect[2] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(2)}/>
              <Circle cx="62.97" cy="557.43" r={smallRadius}
                fill={this.state.effectSelect[3] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(3)}/>
              <Circle cx="204.07" cy="741.64" r={smallRadius}
                fill={this.state.effectSelect[4] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(4)}/>
              <Circle cx="426.5" cy="807.73" r={smallRadius}
                fill={this.state.effectSelect[5] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(5)}/>
              <Circle cx="645.29" cy="730.45" r={smallRadius}
                fill={this.state.effectSelect[6] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(6)}/>
              <Circle cx="776.88" cy="539.34" r={smallRadius}
                fill={this.state.effectSelect[7] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(7)}/>
              <Circle cx="771" cy="307.37" r={smallRadius}
                fill={this.state.effectSelect[8] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(8)}/>
              <Circle cx="629.9" cy="123.17" r={smallRadius}
                fill={this.state.effectSelect[9] ? 'pink' : 'lightsteelblue'} 
                onPress={() => this.selectEffect(9)}/>
              <Circle cx="416.99" cy="432.4" r={bigRadius}
                fill={this.state.effectToggle ? 'salmon' : 'seashell'} 
                onPress={() => this.toggleEffect()}
                onLongPress={() => alert('Long press on Rect')}
              />
            </G>
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