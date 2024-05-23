/*
- Gruppe: Fuji-Crew
- Assets Sources:
  https://www.pexels.com/photo/green-grass-field-under-a-blue-sky-7000571/
  https://i.pinimg.com/originals/af/79/2b/af792bad3df9fd5bf4c1686353827b34.gif
  https://i.pinimg.com/originals/c7/38/41/c738418d2c1b2757c1b05059777067b1.gif
  https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGQzYXJ4ZDBia250bmFpNzY5Nng3bzdyNHE3Mm0xcWJsNWc0em9oYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6P6KvfJGLCUKYLuPJK/giphy.gif
  https://openart.ai/community/DtuooQtmGnOeGbDQ3IVD
  https://similarpng.com/realistic-sakura-or-cherry-blossom-premium-vector-png/
  https://png.pngtree.com/element_pic/16/10/25/038cd628d51b17f68a9d290047c09ee1.jpg
*/
/* 
- Keyboard & Mouse Interactions:
Spacebar: Make Foxes move faster
Key "v" or "V": add bird to scene
Key "b" or "B": remove bird from scene
Mouseclick at last third of canvas: add flower gif
MouseX Hover - change butterflies' direction
*/

///ARRAYS
let butterflies = [];
let foxes = [];
let pollen = [];
let blossoms = [];

//IMAGES
let butterfly;
let vogel;
let fox;
let flower;
let pinkblossom;
let daisy;
let skyBg;

//TARGETS
let target;
let vogelTarget;

//AUDIO
let birdSound;

//LOAD IMAGES
function preload() {
  butterfly = loadImage("./assets/butterfly.gif");
  fox = loadImage("./assets/fox.gif");
  skyBg = loadImage("./assets/pic-bg.jpg");
  pinkblossom = loadImage("./assets/blossom.png");
  daisy = loadImage("./assets/daisy.png");
  birdSound = loadSound("./assets/birdsound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  //initialize walker
  for (let w = 0; w < 8; w++) {
    foxes[w] = new Walker();
  }
  //initialize butterflies
  for (let b = 0; b < 60; b++) {
    butterflies[b] = new Butterfly();
  }
  //initialize pollen
  for (let p = 0; p < 100; p++) {
    pollen[p] = new Pollen();
  } //initialize blossom effect
  for (let p = 0; p < 200; p++) {
    blossoms[p] = new Blossoms();
  }
}

function draw() {
  //background
  background(skyBg);
  //walking foxes
  for (let w = 0; w < foxes.length; w++) {
    foxes[w].update();
    foxes[w].edges();
    foxes[w].display();
  }
  //flying butterflies
  for (let b = 0; b < butterflies.length; b++) {
    butterflies[b].update();
    butterflies[b].checkBorders();
    butterflies[b].display();
    butterflies[b].seekTarget(target);
  }
  //change direction of butterflies based on mouseX
  for (let b = 0; b < butterflies.length; b++) {
    if (mouseX > width / 2) {
      butterflies[b].dirAngle = true;
    } else {
      butterflies[b].dirAngle = false;
      scale(-1, 1);
    }
  }
  //flying pollen & blossoms
  for (let p = 0; p < pollen.length; p++) {
    pollen[p].update();
    pollen[p].edges();
    pollen[p].display();
  }
  //Blossom Effect
  if (vogelTarget) {
    for (let p = blossoms.length - 1; p >= 0; p--) {
      blossoms[p].update();
      blossoms[p].display();
      //delete if out of borders
      if (
        blossoms[p].pos.x > width ||
        blossoms[p].pos.x < 0 ||
        blossoms[p].pos.y > height ||
        blossoms[p].pos.y < 0
      ) {
        blossoms.splice(p, 1);
      }
    }
  }
  //Shadow
  push();
  fill(25, 25, 20, 70);
  noStroke();
  triangle(0, height / 2, (width / 3) * 3, height, 0, height);
  pop();

  /********FRAMERATE********/
  let fps = frameRate();
  fill(0);
  rect(0, height - 25, 60, 25);
  fill(255);
  noStroke();
  textSize(16);
  text(fps.toFixed(2), 10, height - 10);
  /********FRAMERATE********/
}

//add target (growing flower) for butterflies to seek, if gone make target = null
function mouseClicked() {
  if (mouseY > height * (2 / 3) + 50) {
    if (flower) {
      flower.remove();
      target = null;
    }
    setTimeout(() => {
      if (flower) {
        flower.remove();
        target = null;
      }
    }, 5000);
    target = createVector(mouseX, mouseY);
    flower = createImg("./assets/yellow-flower.gif");
    flower.position(mouseX - 40, mouseY - 40);
    flower.size(150, 150);
  }
}

let faster;
//Source:https://p5js.org/reference/#/p5/keyPressed
function keyPressed() {
  //make foxes faster on spacebar
  if (keyCode === 32) {
    faster = true;
  }
  //add bird to scene & bird sound
  if ((key === "v" || key === "V") && !vogel) {
    //init new blossom effect
    for (let p = 0; p < 200; p++) {
      blossoms[p] = new Blossoms();
    }
    push();
    // translate(0, 0);
    vogel = createImg("./assets/bird.gif");
    vogel.position(windowWidth / 2 - 80, windowHeight / 2 - 80);
    vogel.size(200, 200);
    vogelTarget = true;
    pop();
    if (!birdSound.isPlaying()) {
      birdSound.loop();
    }
  }
  if ((key === "b" || key === "B") && vogel) {
    vogel.remove();
    vogel = null;
    vogelTarget = false;
    if (birdSound.isPlaying()) {
      birdSound.stop();
    }
  }
}
//make foxes slower again
function keyReleased() {
  if (keyCode === 32) {
    faster = false;
  }
}
