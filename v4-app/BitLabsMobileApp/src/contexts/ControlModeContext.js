import React from 'react';
import { StyleSheet } from 'react-native';

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

    getToggleActive() {
        if (this.toggleActive)
        { 
            return styles.toggleSelected.fill;
        }
        else 
        {
            return styles.toggleUnselected.fill 
        } 
    }

    updateEffectAmount(effectAmount) {
        return styles.outsideCircle.fill;
    }
}

class _EffectControl {

    constructor() {
        this.id = "EffectControl",
        this.buttonsActive = [false, false, false, false, false, false, false, false];
        this.toggleActive = true;
        this.effectAmount = 0;
    }
  
    handleButtonPress(index)  {} // UNUSED IN THIS MODE

    // GET METHODS
    getButtonsActive(index) {
        if (this.effectAmount >= (index + 1 ) * (1 / 12) - (1 / 24)) {
            return styles.smallEffectActive.fill;
        }
        else {
            return styles.smallEffectInactive.fill;
        }
    }

    getToggleActive(effectAmount) {
        if (this.toggleActive)
        { 
            return styles.toggleSelected.fill;
        }
        else 
        {
            return styles.toggleUnselected.fill 
        } 
    }

    updateEffectAmount(effectAmount) {
        this.effectAmount = effectAmount;

        return styles.outsideCircle.fill;
    }
}

export let EffectSelection = new _EffectSelection();
export let EffectControl = new _EffectControl();

const styles = StyleSheet.create({

    outsideCircle : {
        fill : 'slategray'
    },

    smallSelected : {
      fill : 'pink',
    },
  
    smallUnselected : {
      fill : 'lightsteelblue'
    },

    smallEffectActive: {
        fill: 'white'
    },

    smallEffectInactive: {
        fill: 'grey'
    },

    toggleSelected : {
        fill : 'salmon',
      },
    
    toggleUnselected : {
        fill : 'white'
    },
});
