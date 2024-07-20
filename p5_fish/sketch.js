//Fuji-Crew
//Sources:
//https://us.123rf.com/450wm/tarasdubov/tarasdubov2211/tarasdubov221100264/193982472-seerose-im-teich-flusspflanze-gr%C3%BCne-bl%C3%A4tter-natur-des-sumpfes-landschaft-des-sees-isoliert-auf.jpg?ver=6
//https://i.pinimg.com/originals/b1/3b/dd/b13bdd058119af1ec0159b499560bcc3.jpg
//https://us.123rf.com/450wm/tarasdubov/tarasdubov2211/tarasdubov221100264/193982472-seerose-im-teich-flusspflanze-gr%C3%BCne-bl%C3%A4tter-natur-des-sumpfes-landschaft-des-sees-isoliert-auf.jpg?ver=6
//https://natureofcode.com/autonomous-agents/
//https://medium.com/@thiagowaib/building-a-flock-simulation-with-javascript-336cc2d415a7

//OBJECTS
let boids = [];
let maxBoids = 70;
let bgFishes = [];
let bgFishes2 = [];
let plants = [];
let waterShape = [];
let predators = [];

let predatorNum = 1;

//IMAGES
let koi;
let koiShadow;
let deadfish;
let predator1;

let bgfish;
let bgfish2;
let water;
let plant;

//PLAYER
let player;
let playerCaught = false;
let playerkoi;

let fishCaught = 0;

let music;
let musicOn = false;

let showFrameRate = false;

//GAME STATE
let gameState = "playing";
let playerText = "PLAY MODE 🎮";

function preload() {
  water = loadImage("./assets/waterDeep.jpeg");
  koi = loadImage("./assets/koi1.gif");
  koiShadow = loadImage("./assets/koi1_shadow.gif");
  deadfish = loadImage("./assets/deadfish.png");
  bgfish = loadImage("./assets/bgfish.gif");
  bgfish2 = loadImage("./assets/fish_silh.png");
  predator1 = loadImage("./assets/predator01.gif");
  playerkoi = loadImage("./assets/player.gif");
  plant = loadImage("./assets/plant01.png");
  music = loadSound("./assets/underwater.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //INIT BG FISHES
  for (let b = 0; b < 44; b++) {
    bgFishes.push(new Boid(random(width), random(height)));
  }
  //INIT BG FISHES 2
  for (let b = 0; b < 28; b++) {
    bgFishes2.push(new Boid(random(width), random(height)));
  }
  //INIT PEACEFUL FISHES
  for (let b = 0; b < maxBoids; b++) {
    boids.push(new Boid(random(width), random(height)));
  }
  //INIT PREDATOR
  for (let p = 0; p < predatorNum; p++) {
    predators.push(new Predator(random(-100, 0), random(height)));
    //predator = new Predator(random(-100, 0), random(height));
  }

  //INIT PLAYER
  player = new Player(width / 2, height / 2);

  //INIT PLANTS
  let plantsNum = random(10, 20);
  for (let b = 0; b < plantsNum; b++) {
    plants.push(new Plant());
  }
}

function draw() {
  //BACKGROUND
  background(0, 100, 200);
  image(water, 0, 0, width, height);

  //MODE TEXT
  push();
  textSize(16);
  fill("white");
  text(playerText, 30, 40);
  pop();

  //BACKGROUND FISHES
  for (let b = 0; b < bgFishes.length; b++) {
    //SWARM BEHAVIOR
    bgFishes[b].separate(bgFishes);
    bgFishes[b].align(bgFishes);
    bgFishes[b].cohere(bgFishes);
    //UPDATE & DISPLAY
    bgFishes[b].update();
    bgFishes[b].edges();
    bgFishes[b].display2();
  }

  //BACKGROUND FISHES 2
  for (let b = 0; b < bgFishes2.length; b++) {
    //SWARM BEHAVIOR
    bgFishes2[b].separate(bgFishes2);
    bgFishes2[b].align(bgFishes2);
    bgFishes2[b].cohere(bgFishes2);
    //UPDATE & DISPLAY
    bgFishes2[b].update();
    bgFishes2[b].edges();
    bgFishes2[b].display3();
  }

  //WATER SHAPE
  let watershapeNum = random(2, 4);
  if (random(1) < 0.014) {
    for (let w = 0; w < watershapeNum; w++) {
      let randW = random(width);
      let randH = random(height);
      waterShape.push(new WaterShape(randW, randH));
    }
  }
  for (let w = waterShape.length - 1; w >= 0; w--) {
    waterShape[w].update();
    waterShape[w].display();
    if (waterShape[w].life < 1) {
      waterShape.splice(w, 1);
    }
  }

  //PEACEFUL FISHES
  for (let b = boids.length - 1; b >= 0; b--) {
    //SWARM BEHAVIOR
    if (!boids[b].caught) {
      boids[b].separate(boids);
      boids[b].align(boids);
      boids[b].cohere(boids);
      //Flee from Predator
      for (let p = 0; p < predators.length; p++) {
        boids[b].flee(createVector(predators[p].pos.x, predators[p].pos.y));
      }
      boids[b].edges();
    }
    //UPDATE & DISPLAY
    boids[b].update();
    boids[b].display();
  }
  if (boids.length < 0.8 * maxBoids) {
    let newBoids = maxBoids - boids.length;
    for (let b = 0; b < newBoids; b++) {
      boids.push(new Boid(random(-200, -50), random(height)));
    }
  }

  //PLAYER
  if (playerCaught === true) {
    player = null;
    gameState = "lose";
    playerText = "WATCH MODE 👀";
    document.querySelector("#gameover").style.display = "block";
  } else {
    player.update();
    player.edges();
    player.display();
  }

  //PREDATOR
  for (let p = 0; p < predators.length; p++) {
    if (player) {
      predators[p].seekPlayer(createVector(player.pos.x, player.pos.y));
    }
    predators[p].seek(boids);
    predators[p].update();
    predators[p].edges();
    predators[p].display();
  }

  //BLUE Background
  background(0, 100, 255, 65);
  //PLANTS
  for (let p = 0; p < plants.length; p++) {
    plants[p].float();
    plants[p].update();
    plants[p].edges();
    plants[p].display();
  }
  //BLUE Background
  background(0, 30, 90, 85);

  //Caught Fishes Counter
  textSize(18);
  fill("white");
  text(fishCaught + "x 🐟", width - 70, 40);

  /********FRAMERATE********/
  if (showFrameRate) {
    let fps = frameRate();
    push();
    fill(0);
    rect(0, height - 25, 60, 25);
    fill(255);
    noStroke();
    textSize(16);
    text(fps.toFixed(2), 10, height - 10);
    pop();
  }
  /********FRAMERATE********/
}

function keyPressed() {
  if (key === "f" || key === "F") {
    showFrameRate = !showFrameRate;
  }
}

function mouseClicked() {
  //AUDIO
  if (!musicOn) {
    music.loop();
    musicOn = true;
  }
}

//ADD PREDATORS ON ENTER
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    predatorNum++;
    if (predatorNum > 3) {
      predatorNum = 1;
    }
    while (predators.length < predatorNum) {
      predators.push(new Predator(random(-200, 0), random(height)));
    }
    while (predators.length > predatorNum) {
      predators.pop();
    }
  }
});
