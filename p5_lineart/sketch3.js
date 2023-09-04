//ORBIT

let stars = 200;

function setup() {
  createCanvas(600, 600, WEBGL);
  //noStroke();
}

function draw() {
  background(3, 15, 9);
  frameRate(60);
  //stars
  //fill("red");
  /*push();
  for (let s = 0; s < stars; ++s) {
    fill(255);
    translate(0, 0);
    circle(s, s, 100);
  }
  pop();*/

  let dx = mouseX;
  let dy = mouseY;

  push();
  directionalLight(253, 184, 19, -dx / 4, -dy / 3, -400);
  //directionalLight(80, 100, 120, -200, -200, 100);
  translate(0, 0 * 0.6);
  sphere(50, 50, 60);
  pop();

  push();
  smooth();
  noFill();
  stroke(255);
  strokeWeight(1);
  rotateX(frameCount / 10);
  rotateY(frameCount);

  circle(0, 0, 150);
  circle(0, 0, 200);
  circle(0, 0, 250);
  circle(0, 0, 350);
  circle(0, 0, 450);
  circle(0, 0, 550);

  pop();
}
