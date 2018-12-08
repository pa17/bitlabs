var socket;
var pos;

var settings = {};

var x = 0;
var y = 0;

function preload() {
    // Loading settings.json file
    settings = loadJSON('./settings.json');
    img = loadImage("orbit.png"); 

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    pos = createVector(width / 2, height / 2);

    socket = io.connect(`http://${settings['wlan_ip']}:${settings['port']}`);
}

function draw() {
    background(0);

    fill(x, y, x);
    // image
    // ellipse(5*x, 5*y, 60, 60);
    
    image(img, 5*x+25, 5*y+73, img.width/5, img.height/5);

    var posData = {
        x: x,
        y: y
    }

    socket.emit('position', posData);
}

function handleOrientation(event) {
    x = event.gamma;  // In degree in the range [-180,180]
    y = event.beta; // In degree in the range [-90,90]

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x >  90) { x =  90};
    if (x < -90) { x = -90};
  
    // To make computation easier we shift the range of 
    // x and y to [0,180]
    x += 90;
    y += 90;
  }
  
window.addEventListener('deviceorientation', handleOrientation);




