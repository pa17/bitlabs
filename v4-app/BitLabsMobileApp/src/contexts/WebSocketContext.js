import React from 'react';

// Context to hold all socket communication.
export const WebSocketContext = React.createContext();

export class WebSocketManager {

    constructor(ipv4, port) {
        // Default values.
        port = port || 8080;

        this.ws = new WebSocket(`ws://${ipv4}:${port}/`);

        this.ws.onopen = (evt) => console.log('connected');

        this.ws.addEventListener('open', () => {
            // this.ws.send(JSON.stringify('Hello!'));
        });

        this.ws.addEventListener('message', event => {
            console.log('Received:', event.data);
        });
    }

    testSocket = () => {
        console.log('Testing Socket');
        // this.ws.send('TEST');
    }

}


