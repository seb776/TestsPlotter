let canvas = null;

var w = window.innerWidth;
var h = window.innerHeight;  

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    console.log("test");
  }
  
  function draw() {
    background(100);
  
    noStroke();
    fill(50);
    push();
    translate(-275, 175);
    rotateY(1.25);
    rotateX(-0.9);
    box(100);
    pop();
  
    noFill();
    stroke(255);
    push();
    translate(500, height * 0.35, -200);
    sphere(300);
    pop();
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    console.log("resize");
  }
