let y = 0;
let ySpeed = 1;

let r = 10;
let rSpeed = 0.05;

let s = -10;
let sSpeed = 0.05;

// let colsDay = ["#FFBB5C", "#FF9B50", "#E25E3E", "#C63D2F"];
// let colsNight = ["#27374D", "#526D82", "#9DB2BF", "#DDE6ED"];

function setup() {
  createCanvas(500, 700);
  pixelDensity(2);
  angleMode(DEGREES);
  frameRate(25);

  // randomCol1 = floor(random(colsDay.length));
  // randomCol2 = floor(random(colsNight.length));
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
  rect(-150, height - height / 3 + y * 0.3, width * 2);
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

  //triangle(0, 400, 200, 400, 100, 100);
  // push();
  // stroke(226, 94, 62, 220);
  // strokeWeight(2);
  // let leftRandom1 = 200; //random(170, 200);
  // let leftRandom2 = 215; //random(200, 210);
  // let rightRandom1 = 215;
  // let rightRandom2 = 225;
  // line(leftRandom1, leftRandom1, leftRandom2, leftRandom2);
  // line(rightRandom1, rightRandom1, rightRandom2, 195);
  // pop();

  // push();
  // for (let c = 0; c < 15; c++) {
  //   rotate(0);
  //   fill(226, 94, 62, random(20, 100));
  //   //frameRate(2);
  //   //noLoop();
  //   rect(c * 10, c + 10 * 15, 70, 40, 60);
  // }
  // pop();
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
