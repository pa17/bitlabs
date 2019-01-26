'use strict';

// Importing npm modules.
const 
    max = require('max-api'),
    express = require('express'),
    socket = require('socket.io'),
    os = require( 'os' ),
    fs = require('fs'),
    path = require('path');

// Reading settings.json.
var settings = fs.readFileSync('./public/settings.json');
settings = JSON.parse(settings);
var port = settings.port;
var ip_v4 = ''

// Acquiring local wlan-ipv4 address.
var ifaces = os.networkInterfaces( );
// Index two as first one is IPV6
// var old_ip = ifaces["en0"][3]["address"];
// max.post(`Old IP adress identified: ` + old_ip);

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
max.outlet(ip_v4 + ':' + port);

// Writing local wlan-ipv4 address to settings.json.
settings.wlan_ip = ip_v4;
fs.writeFileSync('./public/settings.json', JSON.stringify(settings), (err) => {});

// Initialising express object.
var app = express();

// Starting server on port, specified in json.
var server = app.listen(port, () => {
    max.post(`Server started, address: ${ip_v4}:${port}`);
});

// Use 'public' directory as host.
app.use(express.static('public'));

var io = socket(server);
io.sockets.on('connection', newConnection);

// Called when new client connection is made.
function newConnection(socket) {
    max.post(`${socket.id}`);

    socket.on('position', posMsg);

    function posMsg(data) {
        max.outlet(data['x'], data['y'], data['z']);
    }
}





