/*
Gruppe: Fuji-Crew
Assets Sources:
https://unsplash.com/de/fotos/berg-umgeben-von-gewasser-iB7gjOsLrEQ
https://ih1.redbubble.net/image.619740584.3371/st,small,507x507-pad,600x600,f8f8f8.u2.jpg
https://ih1.redbubble.net/image.1071223913.7699/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg
https://unsplash.com/de/fotos/luftbild-von-felsformationen-pjsrHjXGnVs
https://cdn.pixabay.com/animation/2023/07/01/12/25/12-25-50-208_512.gif
https://www.flaticon.com/free-icon/sound_8275009?k=1714756220413&sign-up=google
////////
FONT:
https://www.dafont.com/against-2.font?text=PEACE

AUDIO:
Youtube
*/

let showFrameRate = false;

/*FONT*/
let font;
let fontSize = 250;

/*WORD*/
let word = "WAVE";
let wordWidth;

/*AUDIO*/
let bgMusic;
let nightMusic;
let iceSound;
let fluidSound;
let windSound;

/*ASSETS*/
let waterBg;
let waterBgDay;
let waterBgNight;
let currentBg = "day";

let pandoraBg;
let bubble;
let waterCrystal;
let waterFluid;
let kristall;
let bird;

/*PARTICLES*/
let particles = [];
let points;
let newParticles = [];

//steering
let steerOn = true;

//ARROW
let arrow;

//CRUSHER
let crusher;

/*FORCES*/
let forceUp;
let forceDown;

//start playing water element
let isPlayin = false;

//edges
let edgesEnabled = true;

//up
let changeToIce = false;
let moveParticlesUp = false;

//down
let changeToFluid;
let moveParticlesDown = false;

// arrow arrived
let arrowArrived = false;

// crusher arrived
let crusherArrived = false;

/*PRELOADS*/
function preload() {
  font = loadFont("./font/nasalization.otf");
  waterBg = loadImage("./assets/water-bg.jpg");

  waterBgDay = loadImage("./assets/water-bg.jpg");
  waterBgNight = loadImage("./assets/water-night.jpg");

  pandoraBg = loadImage("./assets/bg.jpg");
  bubble = loadImage("./assets/bubble.png");
  waterCrystal = loadImage("./assets/cristall.gif");
  waterFluid = loadImage("./assets/waterdrop.gif");
  kristall = loadImage("./assets/kristall.gif");
  bird = loadImage("./assets/bird.gif");

  bgMusic = loadSound("./audio/jellyfish.mp3");
  nightMusic = loadSound("./audio/night.mp3");
  iceSound = loadSound("./audio/ice-cristall.mp3");
  fluidSound = loadSound("./audio/fluid-water.mp3");
  windSound = loadSound("./audio/wind.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noStroke();
  textFont(font);
  textSize(fontSize);
  fill(0, 0, 255);

  //play audio
  let img = document.getElementById("audio");
  img.addEventListener("click", playSound);
  //switch light & night background
  let switchBg = document.getElementById("switch");
  switchBg.addEventListener("click", switchMode);
  //calculate word width
  wordWidth = textWidth(word);

  points = font.textToPoints(
    word,
    (width - wordWidth) / 2,
    height / 2,
    fontSize,
    { sampleFactor: 0.08 }
  );
  //make particles part of text
  for (let p = 0; p < points.length; p++) {
    let ang = map(p, 0, points.length, 0, TAU);
    let particle = new Particle(
      width / 2 + sin(ang) * 350,
      height / 2 + cos(ang) * 350,
      points[p].x,
      points[p].y,
      random(5, 25)
    );
    particles.push(particle);
  }

  //init ARROW
  arrow = new Arrow();

  //init CRUSHER
  crusher = new Crusher();

  //init forces
  forceUp = createVector(random(-1, 1), -4);
  forceDown = createVector(random(-1, 1), 4);
}

function draw() {
  background(pandoraBg);
  if (isPlayin) {
    background(waterBg);
    //CRUSHER only at bottom
    if (mouseY >= height - 150) {
      push();
      imageMode(CENTER);
      image(kristall, mouseX, height - 100, 80, 80);
      pop();
    }
    for (let i = 0; i < particles.length; i++) {
      if (moveParticlesUp) {
        changeToIce = true;
        //add forceUp and move particles top on UP_ARROW
        particles[i].addForce(forceUp);
        particles[i].update();
      }
      if (moveParticlesDown) {
        changeToFluid = true;
        //add forceDown and move particles down on DOWN_ARROW
        particles[i].addForce(forceDown);
        particles[i].update();
      }

      /*FLEE BASED ON MOUSE POS*/
      if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
        let mousePos = createVector(mouseX, mouseY);
        if (changeToFluid) {
          particles[i].fleeForce(mousePos, 220);
        } else if (changeToIce) {
          particles[i].fleeForce(mousePos, 30);
        } else {
          particles[i].fleeForce(mousePos, 200);
        }
      }
      /*PARTICLES FLEE FROM ARROW*/
      if (arrowArrived) {
        let arrowPos = createVector(arrow.pos.x, arrow.pos.y);
        if (changeToFluid) {
          particles[i].fleeForce(arrowPos, 350);
        } else if (changeToIce) {
          particles[i].fleeForce(arrowPos, 55);
        } else {
          particles[i].fleeForce(arrowPos, 400);
        }
      }
      /*SHRINK PARTICLES BASED ON CRUSHER POS*/
      if (crusherArrived) {
        let crusherPos = createVector(crusher.pos.x, crusher.pos.y);
        particles[i].shrink(crusherPos);
      }

      /*STEER, DRAW AND UPDATE PARTICLES*/
      if (steerOn) {
        particles[i].steer();
      }
      particles[i].update();
      if (edgesEnabled) {
        particles[i].edges();
      }
      particles[i].display();
    }
    //ARROW if right key clicked
    if (arrowArrived) {
      arrow.update();
      arrow.display();
    }
    //CRUSHER if double clicked
    if (crusherArrived) {
      crusher.update();
      crusher.display();
    }
    //new particles on keys 1-5
    for (let i = 0; i < newParticles.length; i++) {
      newParticles[i].update();
      newParticles[i].display();
    }
  }
  //"wave" on keys 1 to 8
  if (soundPlay) {
    handleWave();
  }
  /********FRAMERATE********/
  if (showFrameRate) {
    let fps = frameRate();
    fill(0);
    rect(0, height - 25, 60, 25);
    fill(255);
    noStroke();
    textSize(16);
    text(fps.toFixed(2), 10, height - 10);
  }

  if (keyIsPressed && keySounds.includes(key)) {
    newSize += 0.5;
    if (newSize < 80) {
      for (let i = 0; i < newParticles.length; i++) {
        newParticles[i].size = newSize;
      }
    }
  }
  /********FRAMERATE********/
}

let keySounds = ["1", "2", "3", "4", "5", "6", "7", "8"];
let soundPlay = false;
let newSize = 0;

function handleWave() {
  for (let p = 0; p < particles.length; p++) {
    particles[p].createWave(key);
  }
}

//on key press move particles accordingly based on key
function keyPressed() {
  //keyounds 1 to 5
  if (keySounds.includes(key)) {
    windSound.loop();
    steerOn = false;
    soundPlay = true;
    edgesEnabled = false;
    newSize = 10;
    for (let i = 0; i < key * 2; i++) {
      let newParticle = new Particle(
        random(width),
        random(height),
        points[i].x + 50,
        points[i].y + 50,
        random(5, 10)
      );
      newParticles.push(newParticle);
      newParticles[i].size = newSize;
    }
  }

  if (key === "f" || key === "F") {
    showFrameRate = !showFrameRate;
  }
  if (key === "i" || key === "I") {
    let intc = document.getElementById("interactions");
    if (intc.style.display === "none") {
      intc.style.display = "block";
    } else {
      intc.style.display = "none";
    }
  }
  //UP
  if (keyCode === UP_ARROW) {
    moveParticlesUp = true;
    changeToIce = true;
    changeToFluid = false;
    if (!iceSound.isPlaying()) {
      iceSound.loop();
    }
  }
  //DOWN
  if (keyCode === DOWN_ARROW) {
    moveParticlesDown = true;
    changeToIce = false;
    changeToFluid = true;
    if (!fluidSound.isPlaying()) {
      fluidSound.loop();
    }
  }
  //RIGHT
  if (keyCode === RIGHT_ARROW) {
    arrowArrived = true;
    arrow.edges();
  }
  //SPACEBAR
  if (keyCode === 32) {
    for (let p = 0; p < particles.length; p++) {
      if (particles[p].size === 25) {
        particles[p].size = 50;
      }
    }
  }
}

//remove sound effects & go back to target font position
function keyReleased() {
  windSound.stop();

  newParticles = [];
  newSize = 0;

  if (keyCode === UP_ARROW) {
    moveParticlesUp = false;
    if (iceSound.isPlaying()) {
      iceSound.stop();
    }
  }
  if (keyCode === DOWN_ARROW) {
    moveParticlesDown = false;
    if (fluidSound.isPlaying()) {
      fluidSound.stop();
    }
  }
  soundPlay = false;
  steerOn = true;
  edgesEnabled = true;
}

//shoot crusher on double click
function doubleClicked() {
  crusherArrived = true;
  crusher.edges();
}

//Play Audio (day & night)
function playSound() {
  if (currentBg === "day") {
    if (bgMusic.isPlaying()) {
      bgMusic.stop();
    } else {
      bgMusic.loop();
    }
  } else {
    if (nightMusic.isPlaying()) {
      nightMusic.stop();
    } else {
      nightMusic.loop();
    }
  }
}

//switch atmosphere (day & night)
function switchMode() {
  if (currentBg === "day") {
    waterBg = waterBgNight;
    currentBg = "night";
    nightMusic.loop();
    bgMusic.stop();
  } else {
    waterBg = waterBgDay;
    currentBg = "day";
    bgMusic.loop();
    nightMusic.stop();
  }
}
