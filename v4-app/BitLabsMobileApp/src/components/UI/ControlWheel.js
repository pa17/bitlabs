import React from 'react';
import { Svg } from 'expo';
import { Dimensions } from 'react-native';

import { ControlModeContext } from '../../contexts/ControlModeContext';

const { Image, Circle, G } = Svg;
const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

let selectButtonRadius = screenWidth / 16;
let toggleButtonRadius = screenWidth / 5;
let outsideRadius = screenWidth / 2.315;
let buttonOffset = screenWidth / 7.81;
let buttonFillOpacity = 0.5;

export class ControlWheel extends React.Component {

  constructor(props) {
    super(props);

    this.centerX = screenWidth / 2;
    this.centerY = screenHeight / 2;

    let cPos = calculateCirclePositions(12, outsideRadius-buttonOffset, this.centerX, this.centerY);
    this.cx = cPos[0];
    this.cy = cPos[1];

  }

  render() {
    // TODO: outsideRadius circle is currently used to pass effectAmount into contextProvider which decides
    // what happens to the buttons in EffectControl mode. Hacky...

    return (
      < Svg
        height="92.8%"
        width="100%"
      >
        
        <ControlModeContext.Consumer>
          {({ mode, switchControlMode }) =>
            <G
              id="UI"
            >
              <Image
                y={3.6 * screenHeight / 100}
                x={2.35 * screenWidth / 100}
                width="95%"
                height="100%"
                opacity="1"
                href={require('../img/orbit.png')}
              />

              <Circle cx={this.centerX} cy={this.centerY} r={toggleButtonRadius}
                fill = {mode.updateEffectAmount(this.props.effectAmountX, this.props.effectAmountY, this.props.axisSelect)}
                onPress={() => switchControlMode()}
              />

              <Circle cx={this.cx[0]} cy={this.cy[0]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(0)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(0)}
              />
              <Circle cx={this.cx[1]} cy={this.cy[1]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(1)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(1)}
              />
              <Circle cx={this.cx[2]} cy={this.cy[2]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(2)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(2)}
              />
              <Circle cx={this.cx[3]} cy={this.cy[3]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(3)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(3)}
              />
              <Circle cx={this.cx[4]} cy={this.cy[4]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(4)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(4)}
              />
              <Circle cx={this.cx[5]} cy={this.cy[5]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(5)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(5)}
              />
              <Circle cx={this.cx[6]} cy={this.cy[6]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(6)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(6)}
              />
              <Circle cx={this.cx[7]} cy={this.cy[7]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(7)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(7)}
              />
              <Circle cx={this.cx[8]} cy={this.cy[8]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(8)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(8)}
              />
              <Circle cx={this.cx[9]} cy={this.cy[9]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(9)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(9)}
              />
              <Circle cx={this.cx[10]} cy={this.cy[10]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(10)} fillOpacity = {buttonFillOpacity}
                onPress={() => mode.handleButtonPress(10)}
              />
              <Circle cx={this.cx[11]} cy={this.cy[11]} r={selectButtonRadius}
                fill = {mode.getButtonsActive(11)} fillOpacity = {buttonFillOpacity}
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