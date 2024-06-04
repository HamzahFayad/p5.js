/*Gruppe: Fuji-Crew
//Sources:

//Font: https://www.dafont.com/magic-retro.font?text=Mount+Pictures
//Images:
//https://static.vecteezy.com/system/resources/previews/035/681/387/non_2x/ai-generated-chinese-sky-lantern-isolated-on-transparent-background-free-png.png
//Unsplash
//Audio:
//https://www.youtube.com/watch?v=mfE-Ku3JZVo
//https://www.youtube.com/watch?v=e1G1bE01NCk
//https://editor.p5js.org/YileXu/sketches/QTusLJvlA
*/

let showFrameRate = false;

//IMAGES
let mountain;
let racket;
let lantern;
let star;
let sparkler;

//AUDIO
let sound;
let soundEnded = false;
let fireworkSound;
let smokeSound;
let sparkSound;
let wunderkerzenSound;
let rocketSound;
let explodeSound;

//TEXT
let font;
let font2;
let fontSize = 120;
let textPoints;
let word = "Mount Pictures";
let jubiläum = "100 Years";
let anniversary = false;

//ZOOM / INITS
let zoomLevel = 7;
let zoomSpeed = 0.015;

let startAnimation = false;
let filmBorders = true;

let countD = 0;

//PARTICLES
let fireworks = [];

//LANTERNS
let lanterns = [];

//COLORS
let newCol;
let newCol2;
let newCol3;

//ADDONS
let rockets = [];
let smokes = [];

//SPARKLE SIZES
let sparkleH;
let sparkleResize = -0.45;

function preload() {
  font = loadFont("./assets/Magic-Retro.ttf");
  font2 = loadFont("./assets/MontBlanc.otf");

  mountain = loadImage("./assets/images/mnt.png");
  racket = loadImage("./assets/images/racket.png");
  lantern = loadImage("./assets/images/lantern.png");
  star = loadImage("./assets/images/star1.gif");
  sparkler = loadImage("./assets/images/sparkler.png");

  sound = loadSound("./assets/audio/intro.mp3");
  fireworkSound = loadSound("./assets/audio/fireworkSound.mp3");
  smokeSound = loadSound("./assets/audio/colorbomb.mp3");
  sparkSound = loadSound("./assets/audio/spark.mp3");
  wunderkerzenSound = loadSound("./assets/audio/wunderkerzen.mp3");
  rocketSound = loadSound("./assets/audio/racketLaunch.mp3");
  explodeSound = loadSound("./assets/audio/racketExplode.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noStroke();
  //TEXT
  textFont(font);
  textSize(fontSize);

  newCol = [
    color(142, 122, 181),
    color(183, 132, 183),
    color(228, 147, 179),
    color(238, 165, 166),
    color(251, 255, 177),
    color(255, 191, 169),
    color(249, 215, 28),
    color(255, 255, 244),
  ];
  newCol2 = [
    color(0, 255, 159),
    color(0, 184, 255),
    color(214, 0, 255),
    color(255, 211, 0),
    color(255, 18, 79),
    color(255),
  ];

  newCol3 = [
    color(232, 37, 96),
    color(94, 159, 255),
    color(250, 214, 80),
    color(197, 64, 102),
    color(121, 180, 115),
    color(196, 147, 255),
    color(255, 255, 244),
  ];

  //INIT LANTERNS
  for (let l = 0; l < 20; l++) {
    lanterns.push(new Lantern());
  }

  //ADD ROCKETS
  document.getElementById("rockets").addEventListener("click", () => {
    rocketSound.play();
    rockets.push(
      new Firework(random(width), height, random(newCol2), "launchUp")
    );
  });

  //ADD 100 Years
  document.getElementById("anniversary").addEventListener("click", () => {
    anniversary = !anniversary;
    if (anniversary) {
      sparkleH = 100;
      sparkSound.play();
      wunderkerzenSound.play();
    } else {
      //sparkleH = 100;
      wunderkerzenSound.pause();
    }
  });

  //ADD LIGHT SMOKE
  document.getElementById("smokes").addEventListener("click", () => {
    smokeSound.play();
    let xPos = random(50, width - 50);
    let colPalette = random(newCol3);
    for (let s = 0; s < 150; s++) {
      smokes.push(new Smoke(xPos, height, colPalette));
    }
  });
}

function draw() {
  background(18, 16, 32);

  image(mountain, 0, 0, width, height);

  //DRAW LANTERNS
  for (let l = 0; l < lanterns.length; l++) {
    if (startAnimation) {
      lanterns[l].float();
      lanterns[l].update();
      lanterns[l].display();
    } else {
      lanterns[l].edges();
      lanterns[l].float();
      lanterns[l].display();
    }
  }

  //DRAW FILMBORDERS
  if (filmBorders) {
    push();
    fill(0);
    rect(0, 0, width, height * 0.13);
    rect(0, height - height * 0.13, width, height * 0.13);
    pop();
  }

  //START ANIMATION
  if (startAnimation) {
    //Zoom Out Dolly Effect
    let currentTime = sound.currentTime();
    //map zoom to sound duration + limit to max 1
    let zoomOut = map(currentTime, 0, sound.duration() * 0.55, zoomLevel, 1);
    zoomOut = max(zoomOut, 1);
    push();
    translate(width / 2, height / 2);
    scale(zoomOut);
    translate(-width / 2, -height / 2);

    // TEXT "Mount Pictures" CENTERED
    noStroke();
    textFont(font);
    textSize(fontSize);
    textAlign(CENTER);
    fill(255);
    text(word, width / 2, height * 0.75);
    pop();

    //second text
    if (currentTime >= sound.duration() - 7) {
      //map fading -> start 7 sec before sound ends
      let fade = map(
        currentTime,
        sound.duration() - 7,
        sound.duration(),
        0,
        255
      );
      push();
      noStroke();
      textFont(font2);
      textSize(18);
      textAlign(CENTER);
      fill(252, 190, 17, fade);
      text(
        "a MOUNT PICTURES ENTERTAINMENT company",
        width / 2,
        height * 0.75 + 25
      );
      pop();
    }

    //ADD AUTOMATIC FIREWORKS
    if (random(1) < 0.04 && currentTime >= sound.duration() - 4) {
      fireworks.push(
        new Firework(
          random(width),
          random(100, height / 2),
          random(newCol),
          "automatic"
        )
      );
    }
    //display fireworks
    for (let f = 0; f < fireworks.length; f++) {
      fireworks[f].update("auto");
      fireworks[f].display();
    }
    //remove when completed
    fireworks = fireworks.filter((firework) => !firework.completed());

    //Rockets
    for (let r = 0; r < rockets.length; r++) {
      rockets[r].update("rocket");
      rockets[r].display2();
    }
    rockets = rockets.filter((rocket) => !rocket.completed());

    //100 Years
    if (anniversary) {
      push();
      fill("yellow");
      textAlign(CENTER, CENTER);
      textPoints = font2.textToPoints(
        jubiläum,
        (width - textWidth(jubiläum)) / 2,
        height / 3,
        120,
        {
          sampleFactor: 0.08,
        }
      );
      for (let p of textPoints) {
        push();
        imageMode(CENTER);
        rotate(TWO_PI);
        let imgY = p.y - sparkleH / 2;
        image(sparkler, p.x, imgY, sparkleH / 2, sparkleH);
        pop();
        //ellipse(p.x, p.y, 3, 3);
      }
      sparkleH += sparkleResize;
      if (sparkleH <= 5 || sparkleH >= 100) {
        sparkleResize *= -1;
      }

      pop();
      fireworks = fireworks.filter((firework) => !firework.completed());
    }

    //Smokes
    for (let s = smokes.length - 1; s >= 0; s--) {
      smokes[s].update();
      smokes[s].display();
      if (smokes[s].isFinished()) {
        smokes.splice(s, 1);
      }
    }
  }

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
  if (keyCode === UP_ARROW && startAnimation) {
    rockets.push(
      new Firework(random(width), height, random(newCol2), "launchUp")
    );
  }
  if (keyCode === DOWN_ARROW && startAnimation) {
    smokeSound.play();
    let xPos = random(50, width - 50);
    let colPalette = random(newCol3);
    for (let s = 0; s < 225; s++) {
      smokes.push(new Smoke(xPos, height, colPalette));
    }
  }
}

function mouseClicked() {
  filmBorders = false;
  if (!startAnimation) {
    startAnimation = true;
    document.getElementById("start-play").classList.add("hide");
    if (!sound.isPlaying()) {
      sound.play();
      sound.onended(() => {
        soundEnded = true;
        document.getElementById("interactions").classList.add("show");
      });
      sound.rate(1.2);
    }
  } else {
    fireworks.push(new Firework(mouseX, mouseY, random(newCol), "automatic"));
  }
}
