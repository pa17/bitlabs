// Importing npm modules.
const max = require('max-api'),
    express = require('express'),
    socket = require('socket.io'),
    os = require( 'os' ),
    fs = require('fs'),
    path = require('path');

// Reading settings.json.
var settings = fs.readFileSync('./public/settings.json');
settings = JSON.parse(settings);
var port = settings.port;

// Acquiring local wlan-ipv4 address.
var networkInterfaces = os.networkInterfaces( );
// Index two as first one is IPV6
var wlan_ip = networkInterfaces["en0"][1]["address"];

// Writing local wlan-ipv4 address to settings.json.
settings.wlan_ip = wlan_ip;
fs.writeFileSync('./public/settings.json', JSON.stringify(settings), (err) => {});

// Initialising express object.
var app = express();

// Starting server on port, specified in json.
var server = app.listen(port, () => {
    max.post(`Server started, address: ${wlan_ip}:${port}`);
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





