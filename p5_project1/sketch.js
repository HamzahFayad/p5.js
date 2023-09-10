let posY;

function setup() {
  createCanvas(600, 600, WEBGL);
  posY = 0;
  //pixelDensity(5);
  //noLoop();
}

function draw() {
  background(154, 200, 220);
  ambientLight(60);

  specularMaterial(0);
  shininess(50);

  push();
  createDonut();
  pop();
  glaze();

  push();
  confetti();
  pop();
}

function createDonut() {
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(250, 150, 125, locX, locY, 200);
  pointLight(50, 10, 95, locX - 30, locY - 30, 100);

  scale(3);
  fill(255);
  rotateY(mouseX / 100);
  rotateX(mouseY / 100);
  torus(30, 15, 60, 60);
}

function confetti() {
  frameRate(6);
  for (let c = 0; c < 500; c++) {
    fill(random(255), random(255), random(255));
    circle(
      random(-width, width),
      random(-height, height + posY),
      random(2, 20)
    );
    posY += 0.01;
  }
}

function mousePressed() {
  circle(mouseX, mouseY, 20);
}

function glaze() {
  for (let e = 0; e < width; e++) {
    let locX = mouseX;
    let locY = mouseY;
    fill(237, 145, 173);
    pointLight(250, 150, 125, locX, locY, 100);

    noStroke();
    rotate(20);
    ellipse(e + 150, 150, 50, 150);
  }
}

function mouseClicked() {
  saveGif("donutparty", 5);
  //save("donutparty.png");
}
