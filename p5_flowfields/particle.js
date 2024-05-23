class Butterfly {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height / 3));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    //random speeds to simulate different flying speed
    this.maxSpeed = random(1, 5);
    //direction
    this.dirAngle = false;
    //size
    this.currentSize = 25;
    this.targetSize = 0;
    this.sizeAmt = 0.05;
    //random offsets
    this.offX = random(0, 5000);
    this.offY = random(0, 5000);
  }
  updateSize() {
    if (this.pos.y < height / 2) {
      this.targetSize = 25;
    } else {
      this.targetSize = 80;
    }
    this.currentSize = lerp(this.currentSize, this.targetSize, this.sizeAmt);
    //if bird added to scene, make butterflies smaller to make it look like they flee
    if (vogelTarget === true) {
      //remove target (flower) if vogel appears
      target = null;
      //flower.remove();
      this.maxSpeed = random(7, 8);
      this.currentSize = lerp(this.currentSize, 5, 0.15);
    }
    if (vogelTarget === false) {
      this.maxSpeed = random(1, 5);
      this.currentSize = lerp(this.currentSize, this.targetSize, this.sizeAmt);
    }
  }
  //add force to accelerate
  addForce(force) {
    this.acc.add(force);
  }
  // Method to calculate flow direction based on mouse position
  calculateFlow() {
    //multiply noise with 360°
    //add PI to switch directions
    //create vector from angle and return
    let angle =
      noise(this.offX + 0.01 * this.pos.x, this.offY + 0.01 * this.pos.y) *
      TWO_PI;
    if (this.dirAngle === true) {
      angle += PI;
    } else {
      angle += 0;
    }
    this.offX += 0.01;
    this.offY += 0.01;
    let flowVec = p5.Vector.fromAngle(angle);
    return flowVec;
  }

  //Source: https://editor.p5js.org/codingtrain/sketches/AxuChwlgb
  seekTarget() {
    if (target) {
      let force = p5.Vector.sub(target, this.pos);
      this.addForce(force);
    } else {
      // if no target, follow noise flowfield
      let flow = this.calculateFlow();
      this.addForce(flow);
    }
  }
  update() {
    // Calculate flow direction
    let flow = this.calculateFlow();
    // Add flow force to acceleration
    this.addForce(flow);
    // Update bird's velocity and position
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    // Reset acceleration
    this.acc.mult(0);
  }

  display() {
    //set size based on y location
    this.updateSize();
    //based on dirAngle flip bird based on mouseX position (see sketch.js)
    //Source: https://editor.p5js.org/enickles/sketches/5eqONBHsr
    push();
    translate(this.pos.x, this.pos.y);
    if (!this.dirAngle) {
      scale(-1, 1); // horizontal spiegeln
    }
    //paint butterfly
    image(butterfly, 0, 0, this.currentSize, this.currentSize);
    //image(blossom, 500, 0, this.currentSize, this.currentSize);
    pop();
  }
  //set position randomly
  checkBorders() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < -100 || this.pos.y > height) {
      this.pos.y = random(0, height / 3);
    }
  }
}

class Walker {
  constructor() {
    this.pos = createVector(
      random(-1000, 0),
      random(height * 0.66, height * 0.82)
    );
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = random(1, 3);
    this.newSpeed = random(4, 8);

    this.off = random(-0.02, 0.02);
    //size
    this.currentSize = 200;
    this.targetSize = 350;
    this.sizeAmt = 0.05;
  }
  updateSize() {
    if (this.pos.y >= height * 0.5 && this.pos.y <= height * 0.7) {
      this.targetSize = 150;
    } else {
      this.targetSize = 350;
    }
    this.currentSize = lerp(this.currentSize, this.targetSize, this.sizeAmt);
  }

  addForce(force) {
    this.acc.add(force);
  }
  flow() {
    let angle = -PI * 2;
    let flowVec = p5.Vector.fromAngle(angle + this.off);
    return flowVec;
  }
  jump() {}
  update() {
    let flow = this.flow();
    this.addForce(flow);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (faster) {
      this.vel.limit(this.newSpeed);
    } else {
      this.vel.limit(this.maxSpeed);
    }
  }
  display() {
    this.updateSize();
    //paint foxes
    push();
    translate(this.pos.x, this.pos.y);
    image(fox, 0, 0, this.currentSize, this.currentSize);
    pop();
  }
  edges() {
    if (this.pos.x > width) {
      this.pos.x = -500;
      this.pos.y = random(height * 0.65, height * 0.85);
    }
  }
}

class Pollen {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 1;
    this.off = random(-2, 2);

    this.col = random(200, 255);
    this.randomW = random(2, 8);
    this.randomH = random(2, 8);
    this.randomW2 = random(2, 8);
    this.randomH2 = random(2, 8);
  }
  addForce(force) {
    this.acc.add(force);
  }
  flow() {
    let angle = PI / 2;
    let flowVec = p5.Vector.fromAngle(angle + this.off);
    return flowVec;
  }
  update() {
    let flow = this.flow();
    this.addForce(flow);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    push();
    //point(this.pos.x, this.pos.y);
    noStroke();
    fill(this.col, 120);
    ellipse(this.pos.x, this.pos.y, this.randomW, this.randomH);
    pop();
    //add offsets for positions
    image(
      pinkblossom,
      this.pos.x * this.randomW,
      this.pos.y * this.randomH,
      15,
      15
    );
    image(
      daisy,
      this.pos.x * this.randomW2,
      this.pos.y * this.randomH2,
      12,
      12
    );
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }
}

class Blossoms {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = p5.Vector.random2D();
    this.acc = p5.Vector.random2D();
    //this.acc.mult(10);
    this.maxSpeed = random(10, 16);
  }
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
  }
  display() {
    image(pinkblossom, this.pos.x, this.pos.y, 30, 30);
  }
  edges() {
    if ((this.pos.x > width || this.pos.x < 0) && vogelTarget) {
      this.pos.x = width / 2;
    }
    if ((this.pos.y > height || this.pos.y < 0) && vogelTarget) {
      this.pos.y = height / 2;
    }
  }
}
