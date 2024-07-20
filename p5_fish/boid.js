class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D(); //createVector(0, 0);
    this.acc = createVector(0, 0);
    this.vel.mult(random(2, 3));
    this.maxSpeed = 4;
    this.maxForce = 0.1;

    this.imgW = 220;
    this.imgH = 180;
    this.sizeW = this.imgW;
    this.sizeH = this.imgH;

    this.caught = false;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  updateSize() {
    this.sizeW = map(this.pos.y, 0, height, this.imgW * 0.6, this.imgW * 1.35);
    this.sizeH = map(this.pos.y, 0, height, this.imgH * 0.6, this.imgH * 1.35);
  }

  /*
  ALIGN: shift velocity towards average velocity
  of neigbhoring fish within radius
  */
  align(boids) {
    let radius = 80;
    let desired = createVector();
    //total = neighboring fish
    let total = 0;
    for (let b = 0; b < boids.length; b++) {
      //get distance between this fish and its neighbors
      let d = dist(this.pos.x, this.pos.y, boids[b].pos.x, boids[b].pos.y);
      //add velocity to desired vector only if within range of radius
      if (d > 0 && d < radius) {
        desired.add(boids[b].vel);
        total++;
      }
    }
    if (total > 0) {
      //average out by all local fishs' vel (total number of neighbors)
      desired.div(total);
      desired.setMag(this.maxSpeed);
      //steering force: desired average velocity - current velocity
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  /*
  COHESION: shift position towards average location
  of neighboring fish within radius
  */
  cohere(boids) {
    let radius = 40;
    let desired = createVector();
    //total = neighboring fish
    let total = 0;
    for (let b = 0; b < boids.length; b++) {
      //get distance between this fish and its neighbors
      let d = dist(this.pos.x, this.pos.y, boids[b].pos.x, boids[b].pos.y);
      //add position to desired vector only if within range of radius
      if (d > 0 && d < radius) {
        desired.add(boids[b].pos);
        total++;
      }
    }
    if (total > 0) {
      //average out by all local fish' pos (total number of neighbors)
      desired.div(total);
      //steering force: desired average position - current position
      let steer = p5.Vector.sub(desired, this.pos);
      steer.setMag(this.maxSpeed);
      //steer.sub(this.vel);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  /* 
  SEPARATION: avoid crowding neighboring fish
  */
  separate(boids) {
    let radius = 140;
    let desired = createVector();
    //total = neighboring fish
    let total = 0;
    for (let b = 0; b < boids.length; b++) {
      //get distance between this fish and its neighbors
      let d = dist(this.pos.x, this.pos.y, boids[b].pos.x, boids[b].pos.y);
      //add position to desired vector only if within range of radius
      if (d > 0 && d < radius) {
        //get vector pointing from neighbor fish to current fish
        let diff = p5.Vector.sub(this.pos, boids[b].pos);
        diff.normalize();
        diff.div(d);
        desired.add(diff);
        total++;
      }
    }
    if (total > 0) {
      //average out by all local fish' pos (total number of neighbors)
      desired.div(total);
      //steering force: desired average position - current position
      desired.setMag(this.maxSpeed);
      desired.sub(this.vel);
      desired.limit(this.maxForce);
      this.applyForce(desired);
    }
  }

  flee(target) {
    let desired = p5.Vector.sub(this.pos, target);
    let d = desired.mag();
    if (d < 375) {
      desired.normalize();
      desired.mult(this.maxSpeed);
      // let m = map(d, 0, 400, 0, this.maxSpeed);
      // desired.setMag(m);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce * 4);
      this.applyForce(steer);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    this.updateSize();
    // add PI to flip image
    let theta = this.vel.heading(); // + PI;
    push();
    // translate to the position of the Boid
    translate(this.pos.x, this.pos.y);
    // rotate by angle
    rotate(theta);

    if (this.caught) {
      //ghost form and remove when caught
      this.vel = createVector(0, -20);
      this.pos.add(this.vel);
      push();
      image(
        deadfish,
        (-this.sizeW * 1.7) / 2,
        (-this.sizeH * 1.7) / 2,
        this.sizeW * 1.7,
        this.sizeH * 1.7
      );
      pop();
    } else {
      // draw image at the translated and rotated position
      //half the width & half the height (centered)
      // image(
      //   koiShadow,
      //   -this.sizeW / 2 + cos(theta) * 4,
      //   -this.sizeH / 2 + sin(theta) * 4,
      //   this.sizeW,
      //   this.sizeH
      // );
      image(koi, -this.sizeW / 2, -this.sizeH / 2, this.sizeW, this.sizeH);
    }
    pop();
  }

  display2() {
    push();
    let theta = this.vel.heading();
    let imgW = 40;
    let imgH = 20;
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    image(bgfish, -imgW / 2, -imgH / 2, imgW, imgH);
    pop();
  }

  display3() {
    push();
    let theta = this.vel.heading();
    let imgW = 40;
    let imgH = 22;
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    image(bgfish2, -imgW / 2, -imgH / 2, imgW, imgH);
    pop();
  }

  edges() {
    if (this.pos.x <= -20) {
      this.pos.x = width + 20;
    } else if (this.pos.x >= width + 20) {
      this.pos.x = -20;
      //this.vel.x -= 2;
    }
    if (this.pos.y <= -20) {
      this.pos.y = height + 20;
    } else if (this.pos.y >= height + 20) {
      this.pos.y = -20;
    }
  }
}

class Predator {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    //this.vel.mult(random(4, 5));
    this.maxSpeed = random(7, 10);
    this.maxForce = 0.25;

    this.imgW = 550;
    this.imgH = 450;
    this.sizeW = this.imgW;
    this.sizeH = this.imgH;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  updateSize() {
    this.sizeW = map(this.pos.y, 0, height, this.imgW * 0.7, this.imgW * 1.25);
    this.sizeH = map(this.pos.y, 0, height, this.imgH * 0.7, this.imgH * 1.25);
  }

  //https://natureofcode.com/autonomous-agents/#example-51-seeking-a-target
  seek(boids) {
    let desired = createVector();
    let total = 0;
    // Iterate over boids array
    for (let i = boids.length - 1; i >= 0; i--) {
      let d = p5.Vector.dist(this.pos, boids[i].pos);
      if (d < 300) {
        desired.add(boids[i].pos);
        total++;
      }
      //change fish when caught by predator & then remove
      if (d < 50 && !boids[i].caught) {
        boids[i].caught = true;
        boids[i].vel.mult(0.35);
        this.vel.mult(0.5);
        fishCaught++;
        setTimeout(() => {
          boids.splice(i, 1);
        }, 4000);
      }
    }
    if (total > 0) {
      desired.div(total); // Get the average position
      desired.sub(this.pos); // Get the vector from predator to average position
      desired.setMag(this.maxSpeed); // Set the magnitude to maximum speed
      let steer = p5.Vector.sub(desired, this.vel); // Get the steering force
      steer.limit(this.maxForce); // Limit the steering force
      this.applyForce(steer); // Apply the steering force
    }
  }

  seekPlayer(target) {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);

    if (d < 150) {
      let desired = p5.Vector.sub(target, this.pos);
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
    if (d < 60) {
      playerCaught = true;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    this.updateSize();
    push();
    let theta2 = this.vel.heading();
    translate(this.pos.x, this.pos.y);
    rotate(theta2);
    image(predator1, -this.sizeW / 2, -this.sizeH / 2, this.sizeW, this.sizeH);
    pop();
  }

  edges() {
    if (this.pos.x <= -60) {
      this.pos.x = width;
    } else if (this.pos.x >= width + 60) {
      this.pos.x = -60;
    }
    if (this.pos.y <= -60) {
      this.pos.y = height;
    } else if (this.pos.y >= height + 60) {
      this.pos.y = -60;
    }
  }
}

class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = random(13, 16);
    this.dir = createVector(1, 0);

    this.imgW = 250;
    this.imgH = 210;
    this.sizeW = this.imgW;
    this.sizeH = this.imgH;
  }

  updateSize() {
    this.sizeW = map(this.pos.y, 0, height, this.imgW * 0.6, this.imgW * 1.35);
    this.sizeH = map(this.pos.y, 0, height, this.imgH * 0.6, this.imgH * 1.35);
  }

  update() {
    this.vel.mult(0); // Reset vel to zero

    if (keyIsDown(LEFT_ARROW)) {
      this.vel.x = -this.maxSpeed;
      this.dir.set(-1, 0); // left
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vel.x = this.maxSpeed;
      this.dir.set(1, 0); // right
    } else if (keyIsDown(UP_ARROW)) {
      this.vel.y = -this.maxSpeed;
      this.dir.set(0, -1); // up
    } else if (keyIsDown(DOWN_ARROW)) {
      this.vel.y = this.maxSpeed;
      this.dir.set(0, 1); // down
    }
    this.pos.add(this.vel); // Update pos
  }

  display() {
    this.updateSize();
    let theta = this.dir.heading();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    image(playerkoi, -this.sizeW / 2, -this.sizeH / 2, this.sizeW, this.sizeH);
    pop();
  }

  edges() {
    if (this.pos.x <= -60) {
      this.pos.x = width;
    } else if (this.pos.x >= width + 60) {
      this.pos.x = -60;
    }
    if (this.pos.y <= -60) {
      this.pos.y = height;
    } else if (this.pos.y >= height + 60) {
      this.pos.y = -60;
    }
  }
}
