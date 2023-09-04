let cols1 = ["#A8C1D1", "#6A87A5", "#FAB18B", "#FBBF77", "#FFFFA7"];
let cols2 = ["#352F44", "#27374D", "#2C3333", "#2b251f", "#222831"];
let randomCol;
let padding = 160;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(5);

  randomCol = floor(random(cols1.length));

  //coloring
  background(cols1[randomCol]);
  stroke(cols2[randomCol]);
  fill(cols2[randomCol]);

  noLoop();
}

function draw() {
  generateFrameBorders(padding);
  generateLunaSol();
  //circle(width / 2, height / 2, 50);
}

//border with intersecting edges
function generateFrameBorders(p) {
  noFill();
  strokeWeight(1);
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

function generateBottomLayer() {}

function generateMiddleLayer() {}

//randomize sun and moon
function generateLunaSol() {
  var randomX = random(padding * 1.75, width - padding * 1.75);
  fill(cols2[randomCol]);
  noStroke();
  ellipse(randomX + 20, padding * 1.4, 80, 80);

  fill(cols1[randomCol]);
  noStroke();
  ellipse(randomX, padding * 1.4, 80, 80);

  let pos;
  for (let c = 0; c < 42; c++) {
    fill(cols2[randomCol]);
    if (c % 2 === 0) {
      pos = 30;
    } else {
      pos = 15;
    }
    circle(padding + 15 + (c * padding) / 6, height - padding - pos, 35);
  }
}

function generate() {}

//save image
/*
function mouseClicked() {
  save("p5image.png");
}
*/
