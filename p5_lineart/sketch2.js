let x = 0;
let xspeed = 3;

//var issData;
/*let img;
function preload() {
  img = loadImage("spiderman.jpg");
}*/

function setup() {
  createCanvas(600, 600, WEBGL);
  //strokeWeight(0);
  //noStroke();

  //loadJSON("http://api.open-notify.org/iss-now.json", gotData, "jsonp");
  //background(240, 200, 200);
}

/*function gotData(data) {
  issData = data;
  console.log(issData.iss_position["longitude"]);
}
*/

function draw() {
  background(154, 200, 220);
  ambientLight(60);

  specularMaterial(0);
  shininess(50);

  //pointLight(200, 55, 45, mouseX, mouseY, 200);

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(200, 55, 45, locX, locY, 200);
  //pointLight(255, 255, 255, locX, locY, 50);
  for (let i = 0; i < 10; i++) {
    for (let y = 0; y < 10; y++) {
      strokeWeight(8);
      fill(120);
      point(i * 12, y * 12);
    }
  }
  scale(3);
  fill(255);
  rotateY(mouseX / 100);
  rotateX(mouseY / 100);
  torus(30, 15, 60, 60);

  scale(3);

  fill(250);
  //rotateX(0);
  //rotateY(0);
  //noStroke();
  createSphere(300, 300, 20);
}

function createSphere(x, y, r) {
  translate(x, y);
  sphere(r);
}

/*frameRate(60);
  fill("red");
  if (issData) {
    circle(
      issData.iss_position["longitude"] * -2,
      issData.iss_position["latitude"] * -2,
      40
    );
  }*/

//image(img, 0, 0);
//fill(0);

/*x = x + xspeed;
  if (x >= (height / 4) * 3 || x <= -40) {
    xspeed *= -1;
  }
  ellipse(width / 2, x, 20, 25);*/

// background(240, 200, 200, 16);
/*for (let posX = 0; posX < 25; posX++) {
    for (let posY = 0; posY < 25; posY++) {
      circle(posX * 22, posY * 22, posY);
      fill(210, 50, 100);
    }
  }

  x = x + xspeed;
  fill(mouseX, 120, 150);
  if (x >= height || x <= 0) {
    xspeed *= -1;
  }

  if (keyIsDown(DOWN_ARROW)) {
    x = x + 10;
    if (x >= height || x <= 0) {
      x = height;
    }
  }

  if (keyIsDown(UP_ARROW)) {
    x = x - 10;
    if (x >= height || x <= 0) {
      x = 0;
    }
  }
  ellipse(width / 2, x, 50, 50);
  ellipse(mouseX, mouseY, 45, 45);*/
