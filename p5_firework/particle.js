class Particle {
  constructor(x, y, col, launch) {
    this.pos = createVector(x, y);
    if (launch === "auto") {
      this.vel = createVector(0, 0);
    }
    if (launch === "launch") {
      this.vel = createVector(0, -2);
      this.vel.mult(random(4, 5));
    }
    if (launch === "explode") {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(0, 4));
    }
    this.acc = createVector(0, random(0, -(height / 350)));

    this.life = 255;
    this.col = col;
    this.r = random(1, 4);

    this.angle = random(0, TWO_PI);

    this.prevPos = this.pos.copy();
  }

  addForce(force) {
    this.acc.add(force);
  }

  completed() {
    return this.life < 0;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life -= 3;
  }

  display(exploded) {
    if (exploded) {
      push();
      fill(this.col);
      this.col.setAlpha(this.life);
      if (this.life > 225) {
        //Patt Vira, Youtube: https://www.youtube.com/watch?v=YPKidHmretc (35:00)
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = color(this.col);
      } else {
        drawingContext.shadowBlur = 0;
      }
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
      pop();
    }
  }

  display2(exploded) {
    if (!exploded) {
      push();
      imageMode(CENTER);
      image(racket, this.pos.x, this.pos.y, 25, 100);
      pop();
    }
    if (exploded) {
      push();
      fill(this.col);
      this.col.setAlpha(this.life);
      translate(this.pos.x, this.pos.y);
      rectMode(CENTER);
      rotate(this.angle);
      ellipse(0, 0, this.r * 2, this.r * 2);
      rect(0, 0, this.r * 4, 2);
      pop();
      this.angle += 1;
    }
  }

  edges() {
    if (this.pos.y <= 0) {
      this.vel.y *= -1;
      this.pos.y = constrain(this.pos.y, 0, height / 3);
    }
  }
}

class Smoke {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-0.28, 0.28), random(0, -25));
    this.acc = createVector(0, 0);
    this.r = random(1, 3);
    this.col = col;
    this.life = 255;
    this.maxSpeed = 13;

    this.texture = random([1, 2, 3]);
  }

  addForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life -= 1.5;
    // Gradually increase the size of the smoke
    if (this.r < 100) {
      this.r += 0.15;
    }
  }

  display() {
    push();
    noStroke();
    fill(this.col);
    this.col.setAlpha(this.life);
    ellipse(this.pos.x, this.pos.y, this.r, this.r * 20);
    pop();
  }

  isFinished() {
    return this.life <= 0;
  }
}

class Lantern {
  constructor() {
    this.pos = createVector(random(width), random(100, height - height * 0.2));
    this.vel = p5.Vector.random2D();
    this.vel.mult(0.2);
    this.acc = createVector(0, 0);
    this.maxSpeed = 1;
    this.size = random(70, 140);
  }

  addForce(force) {
    this.acc.add(force);
  }

  //move lanterns upwards
  flow() {
    let angle = -PI / 2;
    let flowVec = p5.Vector.fromAngle(angle);
    // make upward force smaller
    flowVec.mult(0.008);
    return flowVec;
  }

  //update positions of lanterns by adding force
  update() {
    let flow = this.flow();
    this.addForce(flow);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  //floating lanterns on page load
  float() {
    this.addForce(createVector(0.0001, -0.0001));
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  //draw lantern
  display() {
    image(lantern, this.pos.x, this.pos.y, this.size, this.size);
  }

  edges() {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }
}
