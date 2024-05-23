//start scene
function startWater() {
  document.getElementById("start").remove();
  document.querySelector(".water-scene").style.display = "block";
  isPlayin = true;
  bgMusic.loop();
}

class Particle {
  constructor(x, y, targetX, targetY, mass) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.1;
    this.mass = mass;

    this.off = random(-2, 2);

    this.targetPos = createVector(targetX, targetY);

    this.distribute = random(-8, 8);
    this.size = 50;

    this.xOff = random(0, width);
  }

  //add force using Newton's 2nd law
  addForce(force) {
    //F = mass * acc (force = mass * acc)
    //-->  acc = F / mass
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
    if (force.y !== 0) {
      this.pos.add(createVector(this.distribute, 0));
    }
  }

  // make particles avoid object
  fleeForce(enemy, distVal) {
    //get distance between enemy and particle pos
    let distance = p5.Vector.dist(enemy, this.pos);
    //get vector that shows away from particle's pos and in enemy's dir
    let abstoss = p5.Vector.sub(this.pos, enemy);
    if (distance < distVal) {
      //set length
      abstoss.setMag(distVal);
      this.addForce(abstoss);
    }
  }

  //https://editor.p5js.org/codingtrain/sketches/q7O2v_zqQ
  //make particles find their target position
  steer() {
    //calculate desired target direction & set speed
    let desired = p5.Vector.sub(this.targetPos, this.pos);
    //get length of desired vec
    let d = desired.mag();
    let speed = this.maxSpeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    //move at maxSpeed
    desired.setMag(speed);
    //adjust vel (align current vel with desired direction)
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.acc.add(steer);
  }

  //shrink partices
  shrink(enemy) {
    let distance = p5.Vector.dist(enemy, this.pos);
    if (distance < 50) {
      this.size = 25;
    }
  }

  //https://editor.p5js.org/andytilia/sketches/rsxpC-VZm
  createWave(key) {
    let amplitude = key * 6; // Amplitude
    let frequency = 0.1; // Frequenz
    // sinus curve f(x) = a*sin(bx)
    let sinCurve = amplitude * sin(this.pos.x * frequency);
    this.pos.y = sinCurve + height / 2;
    //this.update();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  //different appearances of particles
  display() {
    push();
    if (changeToIce) {
      push();
      imageMode(CENTER);
      image(
        waterCrystal,
        this.pos.x,
        this.pos.y,
        this.size * 2.5,
        this.size * 2.5
      );
      pop();
    } else if (changeToFluid) {
      push();
      imageMode(CENTER);
      image(
        waterFluid,
        this.pos.x,
        this.pos.y,
        this.size * 1.75,
        this.size * 1.75
      );
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(bubble, this.pos.x, this.pos.y, this.size, this.size);
      pop();
    }
    pop();
  }

  edges() {
    if (this.pos.y >= height || this.pos.y <= 20) {
      this.vel.y *= -1;
      this.pos.y = constrain(this.pos.y, 50, height - 50);
    }
    if (this.pos.x >= width || this.pos.x <= 0) {
      //this.vel.x *= -1;
      this.pos.x = constrain(this.pos.x, 0, width);
    }
  }
}

class Arrow {
  constructor() {
    this.pos = createVector(-100, height / 2 - 80);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 22;
  }

  addForce(force) {
    this.acc.add(force);
  }

  fly() {
    let angle = 0;
    let flowVec = p5.Vector.fromAngle(angle);
    return flowVec;
  }
  update() {
    // Calculate flow direction
    let flow = this.fly();
    // Add flow force to acceleration
    this.addForce(flow);
    // Update velocity and position
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    // Reset acceleration
    this.acc.mult(0);
  }

  display() {
    fill(50, 140, 220);
    push();
    imageMode(CENTER);
    scale(0.5);
    translate(this.pos.x, this.pos.y);
    image(bird, this.pos.x, this.pos.y);
    pop();
    //ellipse(this.pos.x, this.pos.y, 200, 15);
  }
  edges() {
    if (this.pos.x >= width) {
      this.pos.x = -100;
    }
  }
}
class Crusher {
  constructor() {
    this.pos = createVector(width / 2, height - 100);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.off = random(-0.05, 0.05);
    this.maxSpeed = 10;
  }

  addForce(force) {
    this.acc.add(force);
  }

  fly() {
    let angle = -PI / 2; // Angle pointing upwards
    let flowVec = p5.Vector.fromAngle(angle);
    return flowVec;
  }

  update() {
    this.pos.x = mouseX;
    // Calculate flow direction
    let flow = this.fly();
    // Add flow force to acceleration
    this.addForce(flow);
    // Update velocity and position
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    // Reset acceleration
    this.acc.mult(0);
  }

  display() {
    fill(50, 140, 220);
    push();
    imageMode(CENTER);
    image(kristall, this.pos.x, this.pos.y, 80, 80);
    pop();
  }

  edges() {
    if (this.pos.y <= 0) {
      this.pos.y = height - 100;
    }
  }
}
