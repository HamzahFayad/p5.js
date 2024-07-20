class Sign {
  constructor(x, y, message) {
    this.pos = createVector(x, y);
    this.message = message;
  }

  display() {
    stroke(255);
    strokeWeight(12);
    line(this.pos.x + 100, this.pos.y + 30, this.pos.x + 100, height);
    fill(255);
    rect(this.pos.x, this.pos.y, 200, 60);
    fill(20);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.message, this.pos.x + 100, this.pos.y + 30);
  }

  update() {
    this.pos.x -= 7;
    if (this.pos.x < -150) {
      currentSign = this.message;
      this.pos.x = width + random(1500, 2000);
      this.pos.y = random(height / 2, height / 2 + 100);
      this.message = random(messages);
    }
  }
}


class MovingObject {
  constructor(img, x, y) {
    this.img = img;
    this.pos = createVector(x, y);
    this.vel = createVector(random(-6.5, -7.5), random(-0.3, 0.3));
    this.maxSpeed = 7;
    this.loadImage();
  }

  update() {
    //this.x -= this.speed;
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    if (this.pos.x < -100) {
      this.pos.x = random(width+2000, width+1500);
      this.imagePath = `/assets/images/${currentSign}.png`;
      this.loadImage();
    }
  }

  display() {
      push();
      imageMode(CENTER);
      image(this.img, this.pos.x, this.pos.y, 80, 80);
      pop();
  }
}