let y = 0;
let ySpeed = 1;

let r = 10;
let rSpeed = 0.05;

let s = -10;
let sSpeed = 0.05;

function setup() {
  createCanvas(500, 700);
  pixelDensity(2);
  angleMode(DEGREES);
  frameRate(10);
}

function draw() {
  y += ySpeed;
  if (y > 60) {
    ySpeed *= -1;
  }
  if (y < 0) {
    ySpeed *= -1;
  }

  r += rSpeed;
  if (r > 10) {
    rSpeed *= -1;
  }
  if (r < 0) {
    rSpeed *= -1;
  }

  s += sSpeed;
  if (r > -10) {
    sSpeed *= -1;
  }
  if (r < 0) {
    sSpeed *= -1;
  }
  background("#FF9B50");

  //decorative line
  strokeWeight(10);
  stroke("#FFBB5C");
  line(0, 115, width, 115);

  //text
  noStroke();
  textSize(60);
  text("Dune", 25, 100);
  textSize(15);
  fill(255, 200);
  text("directed by Denis Villeneuve", 180, 90);

  //SUN
  push();
  fill(255, 187, 92, 200);
  circle(width / 2 - -y * 2 + mouseX / 10, height / 2 - y, 100);
  pop();

  push();
  fill(198, 61, 47, 70);
  rotate(r);
  rect(0, height - height / 3 + y * 0.3, width * 2);
  pop();

  push();
  fill(198, 61, 47, 150);
  rotate(s);
  rect(-150, height - height / 5 + y * 0.9, width * 2);
  pop();

  push();
  fill(226, 94, 62, 100);
  rotate(r / 2);
  rect(-150, height - height / 2 + y * 0.6, width * 2);
  pop();

  push();
  fill(198, 61, 47, 80);
  rotate(s);
  rect(-150, height - 300 + y * 1.2, width * 2);
  pop();
}

// for (let i = 0; i < 15; i++) {
//   fill(255);
//   noStroke();
//   rectMode(CENTER);
//   rect(width / 2 + 50, i * 25 - 20, 150, 12);
//   rect(width / 2 + 50, 500 + i * 25, 150, 12);
// }
// for (let x = 0; x < 10; x++) {
//   rect(width / 1.305 + x * 25, height / 2 + 65, 12, 150);
//   rect(width / 20 - 33 + x * 25, height / 2 + 65, 12, 150);
// }

//save image

/*function mouseClicked() {
  save("dune.png");
}*/
