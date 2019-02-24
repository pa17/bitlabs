var vas;
var windowY;
var stars = [];
var speed;

function setup() {
    windowY = 0;
    vas = createCanvas(windowWidth, 2*windowHeight);
    vas.position(0, 0);
    vas.style('z-index', '-1');
    background(0);

    noStroke();

    star = new Star();
  
    // Create an array of 1600 star objects
    for (var i = 0; i < 200; i++) {
      	stars[i] = new Star();
    }
}

function draw() {
    background(0);

    fill(255, 255, 0);
    rect(200, 300, windowY, windowY);

    if (windowY > 400) {
        fill(255, 0, 255);
        ellipse(400+windowY/5, 400, windowY/2, windowY/2)
    }

    speed = map(0.5, 0, width, 5, 30);
    background(0);
    translate(width/2, height/2);
  
    for (var i = 0; i < stars.length; i++) {
    	stars[i].update();
      	stars[i].show();
    }
}


class Star {
    constructor() {
    	this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);      
        this.pz = this.z;
    }
    update() {
      this.z = this.z - speed;
      if (this.z < 1) {
      	this.z = width;
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.pz = this.z;
      }
    }
  
    show() {
      fill(255);
      noStroke();
      
      var sx = map(this.x/this.z, 0, 1, 0, width);
      var sy = map(this.y/this.z, 0, 1, 0, height);
      var r = map(this.z, 0, width, 12, 0);
      ellipse(sx, sy, r, r);    
      
      var px = map(this.x/this.pz, 0, 1, 0, width);
      var py = map(this.y/this.pz, 0, 1, 0, height);
      this.pz = this.z;
      
      stroke(255);
      line(px, py, sx, sy);
    }
}


