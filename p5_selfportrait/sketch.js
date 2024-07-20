//Sources:
//https://editor.p5js.org/dwantilus/sketches/H1MzBzBT-
//https://www.youtube.com/watch?v=vwYFqLdZPfw&t=1s
//Unsplash, Getimg.ai und co.

//WINDOW WIDTHS
let winW = 25;

//ME
let anim;
let bag;

//LANDSCAPE OFFSET
let landscapeXOffset = 0;
let landscapeSpeed = 0.1;

//TRAIN UP/DOWN MOVEMENTS
let t = 0;

//BACKGROUND SKY
let bgCol;
let inc = 0.05;

//sounds
let trainIntro;
let trainAmbience;

//Clouds
let clouds = [];
let cloudImg;

//Trees
let trees = [];
let treeImgs = [];

//Leafs
let leafs = [];

//quotes
let quotes = [
  "Hi, ich bin Hamzah.",
  "Ich bin Jahrgang 1999.",
  "Die Reise selbsr ist auch wichtig, nicht nur das Ziel.",
  "Video und Foto Editing ist ein Hobby von mir.",
  "Ich bin Fan von Creative Coding.",
  "Ich mache fast täglich Sport.",
  "Ich spreche 4 Sprachen.",
  "Ich gehe oft mit meiner Kamera spazieren.",
  "Ich mag es, Momente durch Fotos festzuhalten.",
  "Sport ist ein großer Teil meines Lebens.",
  "Als introvertierte Person finde ich Kraft in der Stille.",
  "Ich mag es, Geschichten durch bewegte Bilder zu erzählen.",
  "Spaziergänge helfen mir, meine Gedanken zu ordnen.",
  "Rote Pandas sind meine Lieblingstiere.",
  "Ich schaue gerne Animes.",
  "Ich neige dazu, Dinge auf eine logische Weise anzugehen.",
  "Diese Fahrt ist endlos.",
  "Ich bin Persönlichkeitstyp INFJ.",
  "Ich bin Frühaufsteher.",
  "Ich bin ein eher ruhiger Mensch.",
  "Mein Sternzeichen ist Zwilling.",
];
let quotesCode = [
  "Ich studiere Medieninformatik.",
  "Ich kombiniere gern Programmierung mit Kunst.",
  "Ich experimentiere gerne mit p5.js.",
  "Coding hat mein logisches Denken erweitert.",
  "Durch Code kann ich meine Kreativität ausdrücken.",
  "In der Welt des Codes finde ich Ordnung & klare Lösungen.",
  "Ich mag es, neue Herausforderungen anzugehen.",
  "Ich bin eher in der Welt des Webs tätig.",
  "Code und Design gehören für mich zusammen.",
  "Durch Code kann ich meine Ideen zum Leben erwecken.",
];
let quotesPhoto = [
  "Ich interessiere mich für Fotografie seit ich klein bin.",
  "Meine erste Kamera war eine Canon.",
  "Fotografieren bringt mich zur Ruhe.",
  "Diese Fotos habe ich geschossen.",
  "Vorallem mach ich gern Streetfotografie.",
  "Fotografie ist ein Weg, die kleinen Momente einzufangen.",
  "Mein Ziel ist mit Fotos Geschichten zu erzählen.",
  "Mit jedem Klick halte ich Erinnerungen fest.",
  "Fotobearbeitung finde ich auch beruhigend.",
  "Die Kamera ist für mich ein mächtiges Werkzeug.",
];
let quotesTravel = [
  "Auf meiner Bucketlist stehen Länder wie Japan, Island & Australien.",
  "Eine meiner Lieblingsreisen war Neapel, Italien.",
  "Ich mag es, neue Kulturen kennenzulernen.",
  "Ich reise gern, um meinen Horizont zu erweitern.",
  "Ich verbinde gern Reisen mit Fotografie.",
  "Ich habe mal den Vesuv Vulkan bestiegen.",
  "Ich plane gern meine Reisen.",
  "Mit den Locals zu sprechen finde ich inspirierend.",
  "Auf meinen Reisen will ich immer etwas lernen.",
  "Als Introvertierter finde ich alleine zu reisen angenehm.",
  "Beim Reisen teste ich gerne lokale Gerichte aus.",
];
let quoteNum;
let quoteNumCoding;
let quoteNumPhotography;
let quoteNumTravel;
let framesC = 0;
let changeInterval = 360; //6seconds

//SCENES
let scenes = ["coding", "photography", "travel"];
let currentScene;
let sceneIndex = 0;
let surrealWorld = false;

//SCENE 1 (Coding)
let count = 0;
let rectsPerRow = 18;
let space;
let codingMusic;
let binaryImg;
let binarys = [];
let pixelCloud;
let pixelMe;

let p5Logo;
let logos = [];
let caughtLogos = 0;
let unlockedImg = false;
let unlockedImages = [];

let meNewImgs = [];
let randomNewMe;

//SCENE 2 (Photography)
let polaroids = [];
let pics = [];

//SCENE 3 (TRAVEL)
let cities = [];
let windowlights;
let cityBg = [];
let currentCity = 0;

let flugzeug;

//Start
let startScene = false;

//Framerate
let showFrameRate = false;

let signs = [];
let messages = [
  "Berliner",
  "1999er",
  "Programmierer",
  "Sportler",
  "Tierfreund",
  "Fotograf",
  "Filmfan",
  "Abenteurer",
  "Naturliebhaber",
  "Foodie",
  "Introvertiert",
  "Nostalgiker",
  "Frühaufsteher",
  "Analytiker",
  "Perfektionist",
  "Zuhörer",
  "Kreativer Denker",
  "Weltoffen",
  "Frühlingskind",
  "Entwickler",
  "Läufer",
  "Denker",
  "Minimalist"
];
let currentSign;
//-----------------//
//-----------------//
//-----------------//

//START SCENERY
function start() {
  startScene = true;
  let introElement = document.getElementById("intro");
  if (introElement) {
    introElement.remove();
  }
  let interactionsElement = document.getElementById("interactions");
  if (interactionsElement) {
    interactionsElement.style.display = "block";
  }
  trainIntro.pause();
  trainAmbience.loop();
  //bgMusic.loop();
}

//PRELOAD ASSETS
function preload() {
  anim = loadImage("./assets/images/me_anime.png");
  bag = loadImage("./assets/images/tasche.png");
  cloudImg = loadImage("./assets/images/wolke.png");
  //trees
  for (let i = 0; i < 4; i++) {
    treeImgs.push(loadImage(`./assets/images/baum${i}.png`));
  }

  //coding assets
  binaryImg = loadImage("./assets/images/coding/hamzah_binary.png");
  pixelCloud = loadImage("./assets/images/coding/pixelcloud.png");
  pixelMe = loadImage("./assets/images/coding/pixelMe.png");
  p5Logo = loadImage("./assets/images/coding/p5.png");

  meNewImgs.push(loadImage("./assets/images/me_anime_food.gif"));
  meNewImgs.push(loadImage("./assets/images/me_anime_code.png"));
  meNewImgs.push(loadImage("./assets/images/me_anime_camera.gif"));
  meNewImgs.push(loadImage("./assets/images/me_anime_ghibli.gif"));
  meNewImgs.push(loadImage("./assets/images/me_anime_sport.gif"));
  meNewImgs.push(loadImage("./assets/images/me_anime_movies.png"));

  //photography assets
  for (let i = 0; i < 14; i++) {
    pics.push(loadImage(`./assets/images/photo/pic${i}.jpg`));
  }

  //travel assets
  windowlights = loadImage("./assets/images/city/windows.png");
  flugzeug = loadImage("./assets/images/city/flugzeug.png");
  for (let i = 0; i < 15; i++) {
    cityBg.push(loadImage(`./assets/images/city/city${i}.jpeg`));
  }

  //music
  codingMusic = loadSound("./assets/audio/futuristic-music.mp3");
  trainIntro = loadSound("./assets/audio/introAmbience.mp3");
  trainAmbience = loadSound("./assets/audio/train_ambience.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgCol = random(0, 250);

  //INIT SIGNS
  let yOffset = height / 2 + 100;
  let randomXSign = width + random(1500, 2500);
  let randomYSign = yOffset;
  let randomMessage = random(messages);
  currentSign = randomMessage;
  signs.push(new Sign(randomXSign, randomYSign, randomMessage));

  //INIT Quotes
  quoteNum = int(random(0, quotes.length));
  quoteNumCoding = int(random(0, quotesCode.length));
  quoteNumPhotography = int(random(0, quotesPhoto.length));
  quoteNumTravel = int(random(0, quotesTravel.length));

  //INIT CLOUDS
  for (let c = 0; c < 6; c++) {
    let cloudX = random(width, width * 2);
    let cloudY = random(0, height / 3);
    clouds.push(new Cloud(cloudX, cloudY));
  }
  //INIT TREES
  for (let i = 0; i < 5; i++) {
    let x = random(width, width * 2);
    let y = random(height * 0.8, height);
    trees.push(new Tree(x, y, treeImgs));
  }
  //INIT LEAFS
  for (let i = 0; i < 8; i++) {
    let x = random(width, width + 1000);
    let y = random(height * 0.55, height);
    leafs.push(new Leaf(x, y));
  }

  //Intro Sound
  let introEl = document.getElementById("intro");
  if (introEl) {
    // introEl.addEventListener("click", () => {
    //   trainIntro.loop();
    // });
    document.addEventListener("keyup", (event) => {
      if (event.key === "s" || event.key === "S") {
        trainIntro.loop();
      }
    });
  }

  //back to real world
  document.getElementById("realworld").addEventListener("click", () => {
    surrealWorld = false;
    stopMusics();
    landscapeSpeed = 0.1;
  });

  //switch to surreal world
  document.getElementById("surrealWorld").addEventListener("click", () => {
    surrealWorld = true;
    switchScene();
    landscapeSpeed = 0.18;
  });
  //change current scene
  document.getElementById("code").addEventListener("click", () => {
    currentScene = "coding";
  });
  document.getElementById("photo").addEventListener("click", () => {
    currentScene = "photography";
  });
  document.getElementById("travel").addEventListener("click", () => {
    currentScene = "travel";
  });

  //CODING SCENE
  //block spacing
  space = width / rectsPerRow;
  //flying down binarys
  for (let b = 0; b < 80; b++) {
    let xPos = random(-50, width + 50);
    let yPos = random(-4000, -2000);
    binarys.push(new CodeScene(xPos, yPos));
  }
  //flying down p5 logos
  for (let b = 0; b < 10; b++) {
    let xPos = random(0, width);
    let yPos = random(-500, -1000);
    logos.push(new Fallen(xPos, yPos));
  }

  //PHOTOS SCENE
  for (let p = 0; p < 14; p++) {
    polaroids.push(new PhotoScene(pics));
  }

  //TRAVEL SCENE
  for (let p = 0; p < 40; p++) {
    let cityW = random(-100, width);
    let cityH = random(height * 0.2, height * 0.75);
    cities.push(new TravelScene(cityW, cityH));
  }
}

function draw() {
  //ON ENTER HIDE INTRO & START SCENERY
  if (startScene) {
    //LITTLE TRAIN UP/DOWN MOVEMENT
    let trainY = sin(t) * 2;
    translate(0, trainY);
    t += 0.1;

    //SKY FROM DAY TO NIGHT
    let r = map(bgCol, 0, 255, 50, 0);
    let g = map(bgCol, 0, 255, 170, 60);
    let b = map(bgCol, 0, 255, 255, 100);
    background(r, g, b);
    bgCol += inc;

    if (bgCol >= 255) {
      inc = -0.05;
    }
    if (bgCol <= 0) {
      inc = 0.05;
    }

    //MOUNTAINS & SUN/MOON
    drawSun();
    drawMountain();

    //SURREAL WORLD SCENERY
    // Only display scenes if surrealWorld is true
    if (surrealWorld) {
      if (currentScene === "coding") {
        //SCENE 1 (CODING)
        createBlocksBg();
        drawMountain();
        for (let b = 0; b < binarys.length; b++) {
          binarys[b].edges();
          binarys[b].update();
          binarys[b].display();
        }
        //flying down p5 logos
        for (let b = 0; b < logos.length; b++) {
          logos[b].edges();
          logos[b].target();
          logos[b].update();
          logos[b].display();
        }
        //PIXEL ME
        push();
        imageMode(CENTER);
        image(pixelMe, mouseX, mouseY - 25, 60, 120);
        pop();
      } else if (currentScene === "photography") {
        //SCENE 2 (PHOTOGRAPHY)
      } else if (currentScene === "travel") {
        //SCENE 3 (TRAVEL)
        image(cityBg[currentCity], 0, 0, width, height);
        for (let c = 0; c < cities.length; c++) {
          cities[c].update();
          cities[c].edges();
          cities[c].display();
        }
      }
      //CLOUDS
      for (let c = clouds.length - 1; c >= 0; c--) {
        clouds[c].update();
        clouds[c].display();
      }
      //LEAFS
      for (let l = 0; l < leafs.length; l++) {
        leafs[l].update();
        leafs[l].display();
      }
    }

    //NOISE LANDSCAPES
    drawMultipleLandscapes(5);

    //REAL WORLD SCENERY
    if (!surrealWorld) {
      for (let sign of signs) {
        sign.display();
        sign.update();
      }
      //CLOUDS
      for (let c = clouds.length - 1; c >= 0; c--) {
        clouds[c].update();
        clouds[c].display();
      }
      //TREES
      for (let t = 0; t < trees.length; t++) {
        trees[t].update();
        trees[t].display();
      }
      //LEAFS
      for (let l = 0; l < leafs.length; l++) {
        leafs[l].update();
        leafs[l].display();
      }
    }

    //TRAIN WINDOW
    drawWindow();

    //TRAIN SEAT + ME + BAG
    push();
    noStroke();
    fill(106, 27, 35, 250);
    rect(10, height - 75, width - 20, 150, 100);
    imageMode(CENTER);

    let imageHeight = height * 0.42;
    let imageWidth = anim.width * (imageHeight / anim.height);
    let yPos = height - imageHeight / 2 + 10;
    image(anim, width / 4, yPos, imageWidth, imageHeight);
    pop();
    push();
    let bagHeight = height * 0.35;
    let bagWidth = bag.width * (bagHeight / bag.height);
    let bagYPos = height - bagHeight / 2 - 10;
    let bagXPos = width / 4.5 - imageWidth / 2 - bagWidth / 2 - 20;
    image(bag, bagXPos, bagYPos, bagWidth, bagHeight);
    pop();

    /********FRAMERATE********/
    if (showFrameRate) {
      let fps = frameRate();
      push();
      fill(0);
      rect(0, height - 20, 100, 25);
      fill(255);
      noStroke();
      textSize(16);
      text(fps.toFixed(2), 50, height - 10);
      pop();
    }
    /********FRAMERATE********/

    //Add Quotes subtitles randomly
    textSize(18);
    fill(255);
    textAlign(CENTER, CENTER);
    if (!surrealWorld) {
      text(quotes[quoteNum], width / 2, height - 30);
    } else {
      if (currentScene === "coding") {
        textAlign(CENTER, CENTER);
        text(quotesCode[quoteNumCoding], width / 2, height - 30);
        //interaction notice
        textAlign(RIGHT);
        textSize(14);
        text("collect 8 items to unlock my interests", width - 15, 20);
        //Unlock images
        if (unlockedImg) {
          push();
          imageMode(CENTER);
          let imageH = height * 0.42;
          let imageW = randomNewMe.width * (imageH / randomNewMe.height);
          let yPos = height - imageH / 2 + 10;
          image(randomNewMe, width / 4, yPos, imageW, imageH);
          pop();
          // image(p5Logo, width / 2, height / 2, 100, 100);
        }
      } else if (currentScene === "photography") {
        for (let p = 0; p < polaroids.length; p++) {
          polaroids[p].update();
          polaroids[p].edges();
          polaroids[p].display();
          if (polaroids[p].isHovered()) {
            polaroids[p].showPhoto();
          } else {
            polaroids[p].leavePhoto();
          }
        }
        textAlign(CENTER, CENTER);
        textSize(18);
        text(quotesPhoto[quoteNumPhotography], width / 2, height - 30);
        //interaction notice
        textAlign(RIGHT);
        textSize(14);
        text("hover on photos", width - 15, 20);
      } else if (currentScene === "travel") {
        textAlign(CENTER, CENTER);
        textSize(18);
        text(quotesTravel[quoteNumTravel], width / 2, height - 30);
        push();
        imageMode(CENTER);
        image(flugzeug, width / 2, height / 2 + 75, 275, 130);
        pop();
        //interaction notice
        textAlign(RIGHT);
        textSize(14);
        text("mouse click anywhere to change city", width - 15, 20);
      }
    }
    framesC++;
    if (framesC >= changeInterval) {
      quoteNum = int(random(0, quotes.length));
      quoteNumCoding = int(random(0, quotesCode.length));
      quoteNumPhotography = int(random(0, quotesPhoto.length));
      quoteNumTravel = int(random(0, quotesTravel.length));
      framesC = 0;
    }
  }
}

//change scenes + add audios etc. on scene switches
function switchScene() {
  if (surrealWorld) {
    if (currentScene === "coding") {
      count = 0;
      codingMusic.play();
      for (let b = 0; b < binarys.length; b++) {
        binarys[b].resetPosition();
      }
      for (let b = 0; b < logos.length; b++) {
        logos[b].resetPosition();
      }
    } else if (currentScene === "photography") {
      for (let p = 0; p < polaroids.length; p++) {
        polaroids[p].resetPosition();
      }
      codingMusic.pause();
    } else if (currentScene === "travel") {
      codingMusic.pause();
      for (let c = 0; c < cities.length; c++) {
        cities[c].reset();
      }
    }
  }
}

//Landscapes
function drawMultipleLandscapes(numLayers) {
  //from back to front
  for (let i = 0; i < numLayers; i++) {
    let layerSpeed = landscapeXOffset / (numLayers - i);
    let colVal = map(i, 0, numLayers, 180, 10);
    let opac = map(i, 0, numLayers, 210, 255);
    let yStart = map(i, 0, numLayers, height - height / 2.5, height - 60);
    drawLandscape(layerSpeed, colVal, yStart, opac);
  }
  landscapeXOffset += landscapeSpeed;
}

//landscape with vertex and noise val for y
function drawLandscape(xOffset, colVal, yStart, opac) {
  fill(colVal - 25, colVal + 65, colVal + 20, opac);
  noStroke();
  beginShape();
  for (let x = 0; x <= width; x++) {
    //map noise val for random landscape shape
    let y = map(noise(xOffset), 0, 1, yStart, height - 50);
    vertex(x, y);
    xOffset += 0.0035;
  }
  //close the vertex shape
  vertex(width, height - 50);
  vertex(0, height - 50);
  endShape(CLOSE);
}

//MOUNTAINS
let moveParam = 0;
function drawMountain() {
  let xOff = moveParam;
  let colAlpha = map(bgCol, 0, 255, 70, 100);
  fill(50, 100, 200, colAlpha);
  noStroke();
  beginShape();
  for (let m = 0; m <= width; m++) {
    let y = map(noise(xOff), 0, 1, height / 3, height);
    vertex(m, y);
    xOff += 0.01;
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  moveParam += 0.04;
}

//SUN / MOON
let sunPos = 0;
function drawSun() {
  let xPos = map(sunPos, 0, 255, width + 50, -50);
  let yPos = map(sunPos, 0, 255, height * 0.7, height * 0.2);
  push();
  fill(249, 215, 28, 160);
  if (bgCol > 150) {
    fill(255, 255, 255, 160);
  }
  ellipse(xPos, yPos, 70, 70);
  pop();
  sunPos += 0.1;
  if (sunPos > 255) {
    sunPos = 0;
  }
}

//TRAIN WINDOW
let sp = 0;
function drawWindow() {
  let oneFifth = height / 5;
  let winW = width / 50;
  let winH = 10;
  let topHeight = 40;
  let bottomHeight = 40;

  push();
  noStroke();
  fill(40, 40, 43, 255);
  // Main window frame
  rect(0, oneFifth + 80, width, winH + 20);
  // Middle window frames
  rect(width / 4 - winW / 2, 0, winW, oneFifth + 90);
  rect((width * 3) / 4 - winW / 2, 0, winW, oneFifth + 90);
  rect(width / 2 - (winW + 20) / 2, 0, winW + 20, oneFifth + 90);
  // Side window frames
  rect(0, 0, winW + 30 + sp, height + 25);
  rect(width - (winW + 30), 0, winW + 30, height + 25);
  // Top and bottom sections
  rect(0, -topHeight, width, topHeight);
  rect(0, height - bottomHeight, width, bottomHeight);
  pop();
}

//BLOCKS FOR CODING SCENE
function createBlocksBg() {
  let rectEl = 0;
  if (count > (width / 78) * (height / 78)) {
    background("green");
  }
  for (let i = 0; i < width; i += space) {
    for (let j = 0; j < height; j += space) {
      if (rectEl < count) {
        push();
        fill(0);
        rect(i, j, space - 2, space - 2);
        pop();
      }
      rectEl++;
    }
  }
  if (count < (width / 50) * (height / 50)) {
    count++;
  }
}

//ON CLICK CHANGE CITY BG
function mousePressed() {
  if (currentScene === "travel") {
    currentCity = int(random(0, cityBg.length));
  }
}

function stopMusics() {
  codingMusic.pause();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed() {
  if (key === "f" || key === "F") {
    showFrameRate = !showFrameRate;
  }
}
