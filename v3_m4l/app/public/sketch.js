var socket;
var pos;

var settings = {};

var beta = 0;
var gamma = 0;
var alpha = 0;

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

    fill(255*alpha, 255*beta, 255*gamma);

    // image
    ellipse(windowWidth*gamma, windowHeight*beta, 60, 60);
    
    // image(img, 5*x+25, 5*y+73, img.width/5, img.height/5);

    var posData = {
        'beta': beta,
        'gamma': gamma,
        'alpha': alpha
    }

    socket.emit('position', posData);
}

function handleOrientation(event) {
    beta = event.beta;  // x In degree in the range [-180,180]
    gamma = event.gamma; // y In degree in the range [-90,90]
    alpha = event.alpha; // z In degree in the range [0, 360]

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    //if (beta >  90) { beta =  90};
    //if (beta < -90) { beta = -90};
  
    // To make computation easier we shift the range of 
    // x and y to [0,180]
    //beta += 90;
    //gamma += 90;


    // x inits at 180 so that wraparound is when phone is upside down
    //beta += 180;
    // y inits at 90 so that wraparound is when phone stands on long edge
    //gamma += 90;
    // z inits at 180 so that wraparound is when home button points away
    //if (alpha > 180) { alpha -= 360};
    //if (alpha < 180) { alpha += 180};

    // Normalise all values
    //beta = beta / 360;
    //gamma = gamma / 180;
    //alpha = alpha / 360;
  }
  
window.addEventListener('deviceorientation', handleOrientation);




