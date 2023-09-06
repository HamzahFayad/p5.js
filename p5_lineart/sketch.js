let cols1 = ["#A8C1D1", "#6A87A5", "#FAB18B", "#FBBF77", "#FFFFA7"];
let cols2 = ["#352F44", "#27374D", "#2C3333", "#2b251f", "#222831"];
let vibrantCols = ["#FCBAAD", "#E48586", "#E06469", "#FC9C54", "#FFE569"];
let randomCol;
let randomCol2;
let randomVibCol;

let padding = 100;

let moonSun;

function setup() {
  //createCanvas(windowWidth - padding * 2, windowHeight - padding);
  createCanvas(1150, 600);
  pixelDensity(5);

  randomCol = floor(random(cols1.length));
  randomCol2 = floor(random(cols2.length));
  randomVibCol = floor(random(vibrantCols.length));

  //coloring
  background(cols1[randomCol]);
  stroke(cols2[randomCol2]);
  fill(cols2[randomCol2]);

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
  generateCity(padding);
  generateBirds(padding);
  pop();
  //fields
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

      stroke(vibrantCols[randomVibCol]);
      point(p + l * 6, height / 1.25 - m * 3);

      stroke(cols1[randomCol]);
      point(p + l * 6, height / 1.25 - m);

      stroke(cols2[randomCol2]);
      point(p + l * 6, height / 1.2 - m);
      //line(p * l, height - p * m, p * l * 2, height - p * m);
    }
  }
  pop();
}

function generateCity(p) {
  push();
  noStroke();
  //transpareny
  let col = color(cols2[randomCol2]);
  col.setAlpha(128 + 128 * sin(millis() / 50));
  //glowing
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color(cols1[randomCol]);
  for (let m = 0; m < width; m += random(10, 20)) {
    //window lights
    for (let w = 0; w < 8; w++) {
      fill(cols1[randomCol]);
      circle(w + m, height - p - random(80, 230), random(1, 4));
    }
    fill(col);
    rect(
      p + m,
      height - p - random(100, 250),
      random(15, 40),
      200,
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
    //moon
    fill(cols2[randomCol2]);
    noStroke();
    ellipse(randomX + 20, padding + 60, 80, 80);
    fill(cols1[randomCol]);
    noStroke();
    ellipse(randomX, padding + 60, 80, 80);
  } else {
    //sun
    fill(cols2[randomCol2]);
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
  noStroke();
  let col = color(vibrantCols[randomVibCol]);
  col.setAlpha(128 + 128 * sin(millis() / 10000));

  fill(cols2[randomCol2]);
  noStroke();
  //birds
  for (let b = 0; b < random(2, 48); b++) {
    let posX = random(p, width - p - 25);
    let posY = random(p + 25, p + 175);
    if (moonSun === 1) {
      rect(posX, posY, 3, 3, 100);
    }
    //clouds
    for (let c = 0; c < random(2, 22); c++) {
      push();
      fill(col);
      stroke(col);
      strokeWeight(random(2, 6));
      ellipse(random(posX, posX + 100), posY + 50 + c, 28, 6);
      line(posX, posY + 50 + c, posX + random(40, 180), posY + 50 + c);
      line(posX, posY + 180 + c, posX + random(40, 180), posY + 180 + c);
      pop();
    }
  }
}

function generate() {}

//save image

function mouseClicked() {
  save("mycity.png");
}
