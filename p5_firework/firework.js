class Firework {
  constructor(x, y, col, type) {
    if (type === "automatic") {
      this.firework = new Particle(x, y, col, "auto");
      this.pNum = random(50, 150);
    }
    if (type === "launchUp") {
      this.firework = new Particle(x, y, col, "launch");
      this.pNum = random(200, 300);
    }
    this.particles = [];
    this.gravity = createVector(0, 0.15);

    this.exploded = false;
  }

  update(type) {
    if (this.exploded === false) {
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode(type);
      }
      if (this.firework.pos.y <= height / 2 + height / 25) {
        this.firework.addForce(this.gravity);
      }
    }
    for (let p = this.particles.length - 1; p >= 0; p--) {
      this.particles[p].update();
      //remove particles from array when completed
    }
    this.particles = this.particles.filter((p) => !p.completed());
  }

  display() {
    if (this.exploded === false) {
      this.firework.display();
    }
    for (let p = 0; p < this.particles.length; p++) {
      this.particles[p].display(this.exploded);
    }
  }

  display2() {
    if (this.exploded === false) {
      //this.firework.edges();
      this.firework.display2();
    }
    for (let p = 0; p < this.particles.length; p++) {
      //this.particles[p].edges();
      this.particles[p].display2(this.exploded);
    }
  }

  explode(type) {
    //push particles with launch = "explode"
    for (let p = 0; p < this.pNum; p++) {
      this.particles.push(
        new Particle(
          this.firework.pos.x,
          this.firework.pos.y,
          this.firework.col,
          "explode"
        )
      );
    }
    //sound based on type
    if (type === "auto") {
      fireworkSound.setVolume(0.2);
      fireworkSound.play();
    }
    if (type === "rocket") {
      explodeSound.play();
    }
  }

  completed() {
    return (
      this.exploded && this.particles.length === 0 && this.firework.completed()
    );
  }
}
