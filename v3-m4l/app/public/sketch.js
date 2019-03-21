var socket;
var pos;

var settings = {};

var beta = 0;
var gamma = 0;
var alpha = 0;

minAngle = {
    'beta': 0,
    'gamma': 0,
    'alpha': 0,
}

maxAngle = {
    'beta': 90,
    'gamma': 90,
    'alpha': 90,
}

function preload() {
    // Loading settings.json file
    settings = loadJSON('./settings.json');
    img = loadImage("orbit.png"); 
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    background(0);

    pos = createVector(width / 2, height / 2);

    socket = io.connect(`http://${settings['wlan_ip']}:${settings['port']}`);
}

function draw() {
    // background(255-255*x,255-255*y,255*z-255);
    background(0);

    fill(255*alpha, 255*beta, 255*gamma);

    // image
    ellipse(windowWidth*gamma, windowHeight*beta, 60, 60);

    fill(255, 255, 0, 255);
    rect(40, 100, windowWidth*beta/360, 20);
    fill(255, 255, 255, 255);
    rect(40, 100, windowWidth*minAngle['beta']/360, 20);
    rect(40, 100, windowWidth*minAngle['beta']/360, 20);


    fill(255, 0, 255, 255);
    rect(40, 140, windowWidth*gamma/180, 20);
    
    fill(0, 255, 255, 255);
    rect(40, 180, windowWidth*alpha/360, 20);


    // image(img, 5*x+25, 5*y+73, img.width/5, img.height/5);

    var posData = {
        'beta': beta, // x
        'gamma': gamma, // y
        'alpha': alpha // z
    }

    socket.emit('position', posData);
}

function handleOrientation(event) {
    beta = event.beta;  // x In degree in the range [-180,180]
    gamma = event.gamma; // y In degree in the range [-90,90]
    alpha = event.alpha; // z In degree in the range [0, 360]

    // x inits at 180 so that wraparound is when phone is upside down
    beta += 180;
    // y inits at 90 so that wraparound is when phone stands on long edge
    gamma += 90;
    // z inits at 180 so that wraparound is when home button points away
    if (alpha > 180) { alpha -= 360};
    if (alpha < 180) { alpha += 180};
  }
  
window.addEventListener('deviceorientation', handleOrientation);


function setMinAngle(axis)
{
    minAngle = {
        'beta': beta,
        'gamma': gamma,
        'alpha': alpha,
    }

    minAngleMsg = {
        'axis': axis,
        'value': minAngle[axis],
    }

    socket.emit('minAngle', minAngleMsg)
}

function setMaxAngle(axis)
{
    maxAngle = {
        'beta':beta,
        'gamma':gamma,
        'alpha':alpha,
    }

    maxAngleMsg = {
        'axis': axis,
        'value': maxAngle[axis],
    }

    socket.emit('maxAngle', maxAngleMsg)
}