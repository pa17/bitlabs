'use strict';

// Importing npm modules.
const 
    // max = require('max-api'),
    express = require('express'),
    socket = require('socket.io'),
    os = require( 'os' ),
    fs = require('fs'),
    path = require('path'),
    THREE = require('three');

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

// Initialise quaternions
var q_min = new THREE.Quaternion();
q_min.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), Math.PI / 2);

var q_max = new THREE.Quaternion();
q_max.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), Math.PI / 2);

var relative_angle = q_min.angleTo(q_max);

console.log("Relative angle betweem q_min and q_max. Rad: " + relative_angle + ", Deg: " + relative_angle * 180 / Math.PI);

var current_quat = new THREE.Quaternion(0, 0, 0, 1);

var q_rel = q_max.multiply(q_min.inverse());
console.log("Relative quaternion: x: " + q_rel.x + ", y: " + q_rel.y + ", z: " + q_rel.z + ", w: " + q_rel.w);

// Called when new client connection is made.
function newConnection(socket) {
    // max.post(`${socket.id}`);

    // Function handler - get activated when message of that type come in
    socket.on('position', posMsgHandler);

      var ref_axis = new THREE.Vector3(q_rel.x, q_rel.y, q_rel.z);

    function posMsgHandler(data) {

        var rad = Math.PI / 180;
        var current_euler = new THREE.Euler(data['alpha'] * rad, data['beta'] * rad, data['gamma'] * rad, 'ZXY');
        current_quat.setFromEuler(current_euler);

        if (current_quat.w > 0) {

          // APPROACH 1: Swing Twist Decomp.
          //swingTwistDecomposition(current_quat, ref_axis);

          // APPROACH 2: Relative Angles
          console.log(" ");

          console.log("Current Euler. Alpha:" + data['alpha'] + ", Beta: " + data['beta'] + ", Gamma:" + data['gamma']);
          console.log("Relative angle: " + current_quat.angleTo(q_rel) * (180 / Math.PI));
        }

        // max.outlet(data['x'], data['y'], data['z']);
    }

    function relativeAngle(current_quat, q_rel){
      
    }

    function swingTwistDecomposition(in_quat, ref_axis) {
      //console.log("in_quat: " + in_quat);
      //console.log("ref_axis: " + ref_axis.x + ", " + ref_axis.y + ", " + ref_axis.z);

      //var rotation_axis = new THREE.Vector3(in_quat.x, in_quat.y, in_quat.z); // rotation axis
      //console.log("rotation_axis: " + rotation_axis.x + ", " + rotation_axis.y + ", " + rotation_axis.z);
      
      //var projection = rotation_axis.projectOnVector(ref_axis);
      console.log("Projection: ", projection);

      //var twist = new THREE.Quaternion(projection.x, projection.y, projection.z, in_quat.w);
      //twist.normalize();

      //var swing = in_quat.multiply(twist.conjugate());
      //var twist_euler = new THREE.Euler;
      //twist_euler.setFromQuaternion(twist);

      //console.log("Twist: " + twist);
      //console.log("Twist Euler: " + twist_euler.x + ", " + twist_euler.y + ", " + twist_euler.z);
      //console.log(" Swing: " + swing);


    }
    
    // function minEulerHandler(euler) {
    //   q_min = Quaternion.fromEuler(data["alpha"], data["beta"], data["gamma"], 'ZXY').normalize();
    // }

    // function maxEulerHandler(data) {
    //   q_max = Quaternion.fromEuler(data["alpha"], data["beta"], data["gamma"], 'ZXY').normalize();
    // }
}