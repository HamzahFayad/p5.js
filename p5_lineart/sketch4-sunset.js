let padding = 25;
let off = 0;

let lines = [];

//let s1 = stroke(238, 175, 97);
//let s2 = stroke(106, 13, 131);
//let col = [color(238, 175, 97), color(106, 13, 131)];

function setup() {
  createCanvas(500, 650);
  noStroke();
  pixelDensity(5);
}

function draw() {
  background(250);

  fill(238, 175, 97);
  rect(0, 0, width, height / 2);
  fill(106, 13, 131);
  rect(0, height / 2, width, height / 2);

  //frame
  push();
  drawingContext.setLineDash([2]);
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(padding, padding, width - padding * 2, height - padding * 2);
  pop();

  //sun
  circle(width / 2, height / 2 - padding * 2, 100);
  //arc(100, 150, 100, 100, 0, PI * 1.35, OPEN);
  fill(238, 175, 97);
  circle(width / 2, height / 2 + padding * 2, 100);

  //sea lines
  push();
  strokeWeight(1);
  for (let i = 0; i < 2; i++) {
    stroke(pickColor());
    for (let j = 0; j < 75; j++) {
      stroke(pickColor());
      drawingContext.setLineDash([random(i * 2, j / 30)]);

      noLoop();
      line(
        width / 2 - random(j * 2, width / 2) + padding * 1.5,
        height / 2 + 2 + j * 4,
        width - random(j * 2, width / 2) - padding * 1.5,
        height / 2 + 2 + j * 4
      );
    }
  }
  off += 1;
  pop();
}

function pickColor() {
  // Array containing colors
  var colors = ["#eeaf61", "#690d83"];

  // selecting random color
  let random_color = colors[Math.floor(Math.random() * colors.length)];
  return random_color;
}
