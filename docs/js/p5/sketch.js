var vas;
var windowY;

function windowResized() {
    resizeCanvas(1.1*windowWidth, 1.1*windowHeight);
    vas.position(0, windowY);
}

function mouseWheel(e) {
    windowY += e.deltaY;
    if (windowY < 0) { windowY = 0; }
    vas.position(0, windowY);
    print (windowY);
}

function setup() {
    windowY = 0;
    vas = createCanvas(1.1*windowWidth, 1.1*windowHeight);
    vas.position(0, 0);
    vas.style('z-index', '-1');
    background(0);

    noStroke();
}

function draw() {
    background(0);

    fill(255, 255, 0);
    rect(200, 300, windowY, windowY);

    if (windowY > 400) {
        fill(255, 0, 255);
        ellipse(800, 400, windowY/2, windowY/2)
    }
}




