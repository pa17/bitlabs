var socket;
var pos;

var settings = {};

var x = 0;
var y = 0;
var z = 0;

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
    // background(255-255*x,255-255*y,255*z-255);

    fill(255*x, 255*y, 255*z);

    // image
    ellipse(windowWidth*y, windowHeight*x, 60, 60);
    
    // image(img, 5*x+25, 5*y+73, img.width/5, img.height/5);

    var posData = {
        x: x,
        y: y,
        z: z
    }

    socket.emit('position', posData);
}

function handleOrientation(event) {
    x = event.beta;  // In degree in the range [-180,180]
    y = event.gamma; // In degree in the range [-90,90]
    z = event.alpha; // In degree in the range [0, 360]


    // x inits at 180 so that wraparound is when phone is upside down
    x += 180;
    // y inits at 90 so that wraparound is when phone stands on long edge
    y += 90;
    // z inits at 180 so that wraparound is when home button points away
    if (z > 180) { z -= 360};
    if (z < 180) { z += 180};

    // Normalise all values
    x = x / 360
    y = y / 180
    z = z / 360
  }
  
window.addEventListener('deviceorientation', handleOrientation);




