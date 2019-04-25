import React from 'react';

// Context to hold all socket communication.
export const ControlModeContext = React.createContext();

class _EffectSelection {

    constructor() {
        this.buttonsActive = [true, false, false, false, false, false, false, false];
    }
  
    handleButtonPress(index)  {
        this.buttonsActive = [false, false, false, false, false, false, false, false, false];
        this.buttonsActive[index] = true;
    }

    // GET METHODS
    getButtonsActive(index) {
        return this.buttonsActive[index];
    }
}

class _EffectControl {

    constructor() {
        this.buttonsActive = [true, false, false, false, false, false, false, false];
    }
  
    handleButtonPress(index)  {
        console.log(`Effect ${index} selected`);
        this.buttonsActive = [false, false, false, false, false, false, false, false, false];
        this.buttonsActive[index] = true;
    }

    // GET METHODS
    getButtonsActive(index) {
        return this.buttonsActive[index];
    }
}

export let EffectSelection = new _EffectSelection();


