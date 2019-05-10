import React from 'react';
import { StyleSheet } from 'react-native';
import { webSocketManager } from './WebSocketContext';

// Context to hold all socket communication.
export const ControlModeContext = React.createContext();

class _EffectSelection {

    constructor() {
        this.id = "EffectSelection";
        this.buttonsActive = [true, false, false, false, false, false, false, false];
        this.toggleActive = false;
    }
  
    handleButtonPress(index)  {
        this.buttonsActive = [false, false, false, false, false, false, false, false, false];
        this.buttonsActive[index] = true;

        webSocketManager.sendButtonsActive(index);
    }

    getButtonsActive(index) {
        if (this.buttonsActive[index])
        { 
            return styles.smallSelected.fill;
        }
        else 
        {
            return styles.smallUnselected.fill 
        } 
    }

    updateEffectAmount() {
        return styles.toggleButton.fill;
    }
}

class _EffectControl {

    constructor() {
        this.id = "EffectControl",
        this.buttonsActive = [false, false, false, false, false, false, false, false];
        this.toggleActive = true;
        this.effectAmountX = 0;
        this.effectAmountY = 0;
        this.axisSelect = '';
    }
  
    handleButtonPress(index)  {} // UNUSED IN THIS MODE

    getButtonsActive(index) {
        if (index === 0) {
            return styles.controlModeActive.fill;
        }
        switch (this.axisSelect) {
            case 'X':
                if (this.effectAmountX >= (index / 11) - (1 / 22)) {
                    return styles.smallEffectActive.fill;
                }
                else {
                    return styles.smallEffectInactive.fill;
                }
            case 'Y':
                if (this.effectAmountY >= (index / 11) - (1 / 22)) {
                    return styles.smallEffectActive.fill;
                }
                else {
                    return styles.smallEffectInactive.fill;
                }
            case 'X & Y':
                if (index === 6) {
                    return styles.controlModeActive.fill;
                }
                else if ((this.effectAmountX) >= (2*index / 11) - (1 / 22)) {
                    return styles.smallEffectActive.fill;
                }
                else if ((this.effectAmountY) >= (2*(-index + 12) / 11)  - (1 / 22)) {
                    return styles.smallEffectActiveAlt.fill;
                }
                else {
                    return styles.smallEffectInactive.fill;
                }
        }
    }

    updateEffectAmount(effectAmountX, effectAmountY, axisSelect) {
        this.effectAmountX = effectAmountX;
        this.effectAmountY = effectAmountY;
        this.axisSelect = axisSelect;

        return styles.toggleButton.fill;
    }
}

export let EffectSelection = new _EffectSelection();
export let EffectControl = new _EffectControl();

const styles = StyleSheet.create({
    controlModeActive : {
        fill: '#ffffff'
    },

    smallSelected : {
      fill : '#ff00ff',
    },
  
    smallUnselected : {
      fill : '#666464',
    },

    smallEffectActive: {
        fill: '#00ffff'
    },

    smallEffectActiveAlt: {
        fill: '#ffff00'
    },

    smallEffectInactive: {
        fill: '#666464'
    },

    toggleButton: {
        fill: 'transparent'
    },
});
