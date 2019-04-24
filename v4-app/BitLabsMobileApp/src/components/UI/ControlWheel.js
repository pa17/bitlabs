import React from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import { Svg } from 'expo';

import { ControlModeContext } from '../../contexts/ControlModeContext';

const { Circle, Rect, G, Mask } = Svg;

let smallRadius = 20;
let bigRadius = 150;

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export class ControlWheel extends React.Component {

  constructor(props) {
    super(props);

    this.centerX = 160;
    this.centerY = 190;

    let cPos = calculateCirclePositions(8,bigRadius-40, this.centerX, this.centerY);
    this.cx = cPos[0];
    this.cy = cPos[1];
  }

  render() {

    return (
      < Svg
        height="65%"
        width="100%"
      >
        { /* MOVABLE CIRCLE
          <Circle
            cx={toDeg(gamma) + deviceWidth/2}
            cy={toDeg(beta) + 100}
            r="20"
            fill="pink"
            onPress={() => alert('Press on Circle')}
          /> } */}

        <Mask id="Mask" maskUnits="userSpaceOnUse" width="400" height="400">
          <Circle cx={this.centerX} cy={this.centerY} r={bigRadius} fill='slategray' />
        </Mask>

        {/* <G
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
        </G> */}
        
        <ControlModeContext.Consumer>
          {({ mode }) =>
            <G
              id="UIButtonContainer"
              // scale="0.3"
              // transform="translate(115,200)"
            >
              <Circle cx={this.cx[0]} cy={this.cy[0]} r={smallRadius}
                fill = {mode.getButtonsActive(0) ? styles.smallSelected.fill : styles.smallUnselected.fill}
                onPress={() => mode.handleButtonPress(0)}
              />
              <Circle cx={this.cx[1]} cy={this.cy[1]} r={smallRadius}
                fill = {mode.getButtonsActive(1) ? styles.smallSelected.fill : styles.smallUnselected.fill}
                onPress={() => mode.handleButtonPress(1)}
              />
              <Circle cx={this.cx[2]} cy={this.cy[2]} r={smallRadius}
                fill = {mode.getButtonsActive(2) ? styles.smallSelected.fill : styles.smallUnselected.fill}
                onPress={() => mode.handleButtonPress(2)}
              />
              <Circle cx={this.cx[3]} cy={this.cy[3]} r={smallRadius}
                fill = {mode.getButtonsActive(3) ? styles.smallSelected.fill : styles.smallUnselected.fill}
                onPress={() => mode.handleButtonPress(3)}
              />
              <Circle cx={this.cx[4]} cy={this.cy[4]} r={smallRadius}
                fill = {mode.getButtonsActive(4) ? styles.smallSelected.fill : styles.smallUnselected.fill}
                onPress={() => mode.handleButtonPress(4)}
              />
              <Circle cx={this.cx[5]} cy={this.cy[5]} r={smallRadius}
                fill = {mode.getButtonsActive(5) ? styles.smallSelected.fill : styles.smallUnselected.fill}
                onPress={() => mode.handleButtonPress(5)}
              />
              <Circle cx={this.cx[6]} cy={this.cy[6]} r={smallRadius}
                fill = {mode.getButtonsActive(6) ? styles.smallSelected.fill : styles.smallUnselected.fill}
                onPress={() => mode.handleButtonPress(6)}
              />
              <Circle cx={this.cx[7]} cy={this.cy[7]} r={smallRadius}
                fill = {mode.getButtonsActive(7) ? styles.smallSelected.fill : styles.smallUnselected.fill}
                onPress={() => mode.handleButtonPress(7)}
              />
            </G>
          }
        </ControlModeContext.Consumer>
      </Svg>
    );
  }
}

function calculateCirclePositions(steps, radius, centerX, centerY) {

  cX=[];
  cY=[];

  for (var i = 0; i < steps; i++) {
    cX[i] = (centerX + radius * Math.cos((2 * Math.PI * i / steps) - Math.PI/2));
    cY[i] = (centerY + radius * Math.sin((2 * Math.PI * i  / steps) - Math.PI/2));
  }

  cPos = [cX, cY];
  return cPos;
}

const styles = StyleSheet.create({

  smallSelected : {
    fill : 'pink',
  },

  smallUnselected : {
    fill : 'lightsteelblue'
  }
});