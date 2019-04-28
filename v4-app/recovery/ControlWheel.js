import React from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import { Svg } from 'expo';

import { ControlModeContext } from '../../contexts/ControlModeContext';

const { Circle, Rect, G, Mask } = Svg;

let selectButtonRadius = 20;
let toggleButtonRadius = 70;
let outsideRadius = 150;
let buttonOffset = 40;

let deviceWidth = Dimensions.get('window').width;

export class ControlWheel extends React.Component {

  constructor(props) {
    super(props);

    this.centerX = 160;
    this.centerY = 190;

    let cPos = calculateCirclePositions(12, outsideRadius-buttonOffset, this.centerX, this.centerY);
    this.cx = cPos[0];
    this.cy = cPos[1];

  }

  render() {
    return (
      < Svg
        height="65%"
        width="100%"
      >
        
        <ControlModeContext.Consumer>
          {({ mode, switchControlMode }) =>
            <G
              id="UI"
            >
              <Circle cx={this.centerX} cy={this.centerY} r={outsideRadius}
               fill={mode.updateEffectAmount(this.props.effectAmount)} />

              <Circle cx={this.centerX} cy={this.centerY} r={toggleButtonRadius}
                fill = {mode.getToggleActive()}
                onPress={() => switchControlMode()}
              />

              <Circle cx={this.cx[0]} cy={this.cy[0]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(0)}
                onPress={() => mode.handleButtonPress(0)}
              />
              <Circle cx={this.cx[1]} cy={this.cy[1]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(1)}
                onPress={() => mode.handleButtonPress(1)}
              />
              <Circle cx={this.cx[2]} cy={this.cy[2]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(2)}
                onPress={() => mode.handleButtonPress(2)}
              />
              <Circle cx={this.cx[3]} cy={this.cy[3]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(3)}
                onPress={() => mode.handleButtonPress(3)}
              />
              <Circle cx={this.cx[4]} cy={this.cy[4]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(4)}
                onPress={() => mode.handleButtonPress(4)}
              />
              <Circle cx={this.cx[5]} cy={this.cy[5]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(5)}
                onPress={() => mode.handleButtonPress(5)}
              />
              <Circle cx={this.cx[6]} cy={this.cy[6]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(6)}
                onPress={() => mode.handleButtonPress(6)}
              />
              <Circle cx={this.cx[7]} cy={this.cy[7]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(7)}
                onPress={() => mode.handleButtonPress(7)}
              />
              <Circle cx={this.cx[8]} cy={this.cy[8]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(8)}
                onPress={() => mode.handleButtonPress(8)}
              />
              <Circle cx={this.cx[9]} cy={this.cy[9]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(9)}
                onPress={() => mode.handleButtonPress(9)}
              />
              <Circle cx={this.cx[10]} cy={this.cy[10]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(10)}
                onPress={() => mode.handleButtonPress(10)}
              />
              <Circle cx={this.cx[11]} cy={this.cy[11]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(11)}
                onPress={() => mode.handleButtonPress(11)}
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