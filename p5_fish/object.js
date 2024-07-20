class Plant {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.vel.mult(0.2);
    this.acc = createVector(0, 0);
    this.maxSpeed = 1;

    this.imgW = 120;
    this.imgH = 120;

    this.sizeW = this.imgW;
    this.sizeH = this.imgH;
  }

  addForce(force) {
    this.acc.add(force);
  }

  updateSize() {
    this.sizeW = map(this.pos.y, 0, height, this.imgW * 0.6, this.imgW * 1.35);
    this.sizeH = map(this.pos.y, 0, height, this.imgH * 0.6, this.imgH * 1.35);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  float() {
    this.addForce(createVector(0.0001, -0.0001));
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    this.updateSize();
    image(plant, this.pos.x, this.pos.y, this.sizeW, this.sizeH);
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

class WaterShape {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.maxSpeed = 20;
    this.life = 240;

    this.size = 4;
    this.incrSize = random(1, 3);
    this.incrLife = random(2, 5);
  }

  update() {
    this.size += this.incrSize;
    this.life -= this.incrLife;
    if (this.life < 1) {
    }
  }

  display() {
    strokeWeight(1);
    stroke(219, 233, 244, this.life);
    noFill();
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
