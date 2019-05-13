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

max.post('Running node script server.js');

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
// max.outlet(ip_v4 + ':' + port);

var clientConnected = 0;
var motionData = { alpha: 0, beta: 0, gamma: 0 };
var buttonActive = 0;
var controlling = false;
var axisSelected = '';


const wss = new WebSocket.Server({ port: port });

wss.on('connection', function connection(ws) {

  clientConnected = 1;

  ws.on('message', function incoming(message) {

    if (isJson(message)) {

      var json = JSON.parse(message)

      // Choose how to process the JSON based on the first top level key.
      switch (Object.keys(json)[0]) {
        case 'data':
        if (controlling) {
            motionData = json['data'];
          }
          break;

        case 'buttonsActive':
          buttonActive = json['buttonsActive'];
          break;

        case 'axisSelected':
          axisSelected = json['axisSelected'];
          // max.post(json['axisSelected']);
          break;

        case 'controlMode':
          var controlMode = json['controlMode'];

          if (controlMode == 'effectControl') {
            controlling = true;
          } else {
            controlling = false;
          }
          break;

        default:
          max.post('Unknown JSON message received');
      }
    }
  });
  max.post('Client Connected!')
});

// Send all axes.
function sendAll() {
  max.outlet(
    clientConnected,
    motionData['alpha'],
    motionData['beta'],
    motionData['gamma'],
    buttonActive);
}

// Send only the selected axis.
function sendOne() {
  var _motionData = motionData[axisSelected];

  max.outlet(
    clientConnected,
    _motionData,
    _motionData,
    _motionData,
    buttonActive);
}

// SetInterval
setInterval(sendAll, 15);

// Check if a string is in JSON format.
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

