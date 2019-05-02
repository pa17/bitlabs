import React from 'react';

// Context to hold all socket communication.
export const WebSocketContext = React.createContext();

class WebSocketManager {

    constructor(ipv4, port) {
        this.ipv4 = ipv4;

        // Default values.
        this.port = port || 8080;

        this.connected = false;

        this.initialise();
    }

    initialise() {
        this.ws = new WebSocket(`ws://${this.ipv4}:${this.port}/`);

        this.ws.onopen = (evt) => {
            this.connected = true;
            console.log('Connected to Server');
        }

        this.ws.addEventListener('open', () => {
        });

        this.ws.addEventListener('message', event => {
        });

        this.ws.onclose = (evt) => {
            this.connected = false;
            console.log('Disconnected from Server');
        }
    }

    sendMotionData(data) {
        if (this.connected) {
            var msg = { data: data };
            this.ws.send(JSON.stringify(msg));
        }
    }

    sendButtonsActive(index) {
        if (this.connected) {
            var msg = { buttonsActive: index }
            this.ws.send(JSON.stringify(msg));
        }
    }

    testSocket() {
        console.log('Testing Socket');
    }
}

// Create instance of WebSocketManager, to be used for all communication.
export const webSocketManager = new WebSocketManager('146.169.146.91');
