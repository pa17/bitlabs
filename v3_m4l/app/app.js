'use strict';

// Importing npm modules.
const 
    // max = require('max-api'),
    express = require('express'),
    socket = require('socket.io'),
    os = require( 'os' ),
    fs = require('fs'),
    path = require('path');

//
//  SETUP
//

// Reading settings.json.
var settings = fs.readFileSync('./public/settings.json');
settings = JSON.parse(settings);
var port = settings.port;
var ip_v4 = ''

// Acquiring local wlan-ipv4 address.
var ifaces = os.networkInterfaces( );

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
        ip_v4 = iface.address
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
        ip_v4 = iface.address
      }
      ++alias;
    });
  });

// max.post(`IP address identified: ` + ip_v4);
// max.outlet(ip_v4 + ':' + port);

// Writing local wlan-ipv4 address to settings.json.
settings.wlan_ip = ip_v4;
fs.writeFileSync('./public/settings.json', JSON.stringify(settings), (err) => {});

// Initialising express object.
var app = express();

// Starting server on port, specified in json.
var server = app.listen(port, () => {
    // max.post(`Server started, address: ${ip_v4}:${port}`);
});

// Use 'public' directory as host.
app.use(express.static('public'));

var io = socket(server);
io.sockets.on('connection', newConnection);

//
//  LOOPS
// 

// Called when new client connection is made.
function newConnection(socket) {
  // max.post(`${socket.id}`);

  socket.on('position', posMsgHandler);
  socket.on('minAngle', minAngleMsgHandler);
  socket.on('maxAngle', maxAngleMsgHandler);

  var minAngles = {
    'beta': 150,
    'gamma': 0,
    'alpha': 0,
  }

  var maxAngles = {
    'beta': 210,
    'gamma': 180,
    'alpha': 360,
  }

  var scaledAngles = {
    'beta': 0,
    'gamma': 0,
    'alpha': 0,
  }

  function posMsgHandler(data) {

    // console.log(data);

    if (data['beta'] >=  minAngles['beta'] && data['beta'] <= maxAngles['beta']) {
      console.log("Beta: " + data['beta'] + " Beta_MIN: " + minAngles['beta'] + ", Diff: " + Math.abs(data['beta'], minAngles['beta']));
      scaledAngles['beta'] = Math.abs(data['beta'] - minAngles['beta']) / Math.abs(maxAngles['beta'] - minAngles['beta']);
    }

    if (data['gamma'] >=  minAngles['gamma'] && data['gamma'] <= maxAngles['gamma']) {
      scaledAngles['gamma'] = Math.abs(data['gamma'] - minAngles['gamma']) / Math.abs(maxAngles['gamma'] - minAngles['gamma']);
    }

    if (data['alpha'] >=  minAngles['alpha'] && data['alpha'] <= maxAngles['alpha']) {
      scaledAngles['alpha'] = Math.abs(data['alpha'] - minAngles['alpha']) / Math.abs(maxAngles['alpha'] - minAngles['alpha']);
    }

    console.log(scaledAngles);
    // max.outlet(scaledAngles['beta'], scaledAngles['gamma'], scaledAngles['alpha']);
  }

  function minAngleMsgHandler(data) {

    var minAngles = {
      'beta': data['beta'],
      'gamma': data['gamma'],
      'alpha': data['alpha'],
    }
  }

  function maxAngleMsgHandler(data) {

    var maxAngles = {
      'beta': data['beta'],
      'gamma': data['gamma'],
      'alpha': data['alpha'],
    }
  }
}
