let stars = 200;
let angle = 0;
let r = 130;

function setup() {
  createCanvas(600, 600, WEBGL);
  //noStroke();
}

function draw() {
  background(3, 15, 9);
  //frameRate(60);
  //stars
  //fill("red");
  /*push();
  for (let s = 0; s < stars; ++s) {
    fill(255);
    translate(0, 0);
    circle(s, s, 100);
  }
  pop();*/

  //ellipse(r * cos(angle), r * sin(angle), 30, 30);
  //angle += 0.01;

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
  //rotate(frameCount);

  circle(0, 0, 150);
  circle(0, 0, 200);
  circle(0, 0, 250);
  circle(0, 0, 350);
  circle(0, 0, 450);
  circle(0, 0, 550);
  pop();

  push();
  fill("purple");
  rotate(-frameCount / 50);
  circle(75, 0, 10);
  rotate(frameCount / 25);
  circle(100, 0, 25);
  rotate(-frameCount / 15);
  circle(125, 0, 20);
  rotate(-frameCount / 225);
  circle(-175, 0, 40);
  rotate(-frameCount / 150);
  fill("red");
  circle(225, 0, 35);
  rotate(frameCount / 20);
  circle(275, 0, 20);

  pop();
}
