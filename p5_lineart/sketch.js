let cols1 = ["#A8C1D1", "#6A87A5", "#FAB18B", "#FBBF77", "#FFFFA7"];
let cols2 = ["#352F44", "#27374D", "#2C3333", "#2b251f", "#222831"];
let randomCol;
let padding = 100;

let moonSun;

function setup() {
  createCanvas(windowWidth - padding * 2, windowHeight - padding);
  pixelDensity(5);

  randomCol = floor(random(cols1.length));

  //coloring
  background(cols1[randomCol]);
  stroke(cols2[randomCol]);
  fill(cols2[randomCol]);

  //variables
  moonSun = int(random(1, 3));
  if (windowWidth < 900) {
    padding = 80;
  }

  noLoop();
}

function draw() {
  //background(cols1[randomCol]);

  push();
  generateLunaSol();
  generateBirds(padding);
  generateFence(padding);
  pop();
  push();
  generateFields(padding);
  pop();
  //BORDERS
  push();
  stroke(cols1[randomCol]);
  strokeWeight(200);
  noFill();
  rect(0, 0, width, height);
  pop();

  generateFrameBorders(padding);

  //circle(width / 2, height / 2, 50);
}

/*function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth < 900) {
    padding = 80;
  }
}*/

//border with intersecting edges
function generateFrameBorders(p) {
  noFill();
  strokeWeight(2);
  rect(p, p, width - p * 2, height - p * 2);

  //top left
  line(p, p, p - 20, p);
  line(p, p, p, p - 20);
  //bottom left
  line(p, height - p, p, height - p + 20);
  line(p, height - p, p - 20, height - p);
  //top right
  line(width - p, p, width - p + 20, p);
  line(width - p, p, width - p, p - 20);
  //bottom right
  line(width - p, height - p, width - p + 20, height - p);
  line(width - p, height - p, width - p, height - p + 20);
}

function generateFields(p) {
  /*noStroke();
  let col = color(cols2[randomCol]);
  col.setAlpha(128 + 128 * sin(millis() / 1000));
  fill(col);
    rect(200, p + 200, 300);*/
  //fill(`${cols2[randomCol]}, 42`);

  //strokeWeight(2);
  rect(p, height - p - 20, width);
  push();
  for (let l = 0; l < width; l++) {
    for (let m = 0; m < 25; m++) {
      strokeWeight(random(1, 40));

      stroke("#FC9C54");
      point(p + l * 6, height / 1.25 - m * 3);

      stroke(cols1[randomCol]);
      point(p + l * 6, height / 1.25 - m);

      stroke(cols2[randomCol]);
      point(p + l * 6, height / 1.2 - m);
      //line(p * l, height - p * m, p * l * 2, height - p * m);
    }
  }
  pop();
}

function generateBottomLayer() {}

function generateMiddleLayer() {}

function generateFence(p) {
  push();
  noStroke();
  let col = color(cols2[randomCol]);
  col.setAlpha(128 + 128 * sin(millis() / 50));
  fill(col);
  for (let m = 0; m < width; m += random(10, 20)) {
    rect(
      p + m,
      height - p - random(100, 200),
      random(10, 40),
      120,
      random(0, 5)
    );
    //rect(p, p + m + 230, width, 3, 8);
  }
  pop();
}

//randomize sun and moon
function generateLunaSol() {
  var randomX = random(padding * 1.75, width - padding * 1.75);

  push();
  if (moonSun === 1) {
    fill(cols2[randomCol]);
    noStroke();
    ellipse(randomX + 20, padding + 60, 80, 80);

    fill(cols1[randomCol]);
    noStroke();
    ellipse(randomX, padding + 60, 80, 80);
  } else {
    fill(cols2[randomCol]);
    circle(randomX, padding + 60, 80);
    pop();
  }

  /*let pos;
  for (let c = 0; c < 42; c++) {
    fill(cols2[randomCol]);
    if (c % 2 === 0) {
      pos = 30;
    } else {
      pos = 15;
    }
    circle(padding + 15 + (c * padding) / 6, height - padding - pos, 35);
  }*/
}

function generateBirds(p) {
  fill(cols2[randomCol]);
  noStroke();
  for (let b = 0; b < random(2, 8); b++) {
    let posX = random(p + 25, width - p - 25);
    rect(posX, random(p + 25, p + 75), 10, 10, 50);
  }
}

function generate() {}

//save image

/*
function mouseClicked() {
  save("lineart.png");
}
*/
