'use strict';

// Importing npm modules.
const
  os = require('os'),
  fs = require('fs'),
  path = require('path'),
  max = require('max-api'),
  WebSocket = require('ws');

//
//  SETUP
//

var port = 8080;
var ip_v4 = ''

// Acquiring local wlan-ipv4 address.
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // console.log(ifname + ':' + alias, iface.address);
      ip_v4 = iface.address
    } else {
      // this interface has only one ipv4 adress
      // console.log(ifname, iface.address);
      ip_v4 = iface.address
    }
    ++alias;
  });
});

// max.post(`IP address identified: ` + ip_v4);
max.outlet(ip_v4 + ':' + port);

const wss = new WebSocket.Server({ port: port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    

    var json = JSON.parse(JSON.stringify(message));
    var data = json["test"];
    // max.post(data);
    console.log(data);

  });

  max.post('Server On')
});
