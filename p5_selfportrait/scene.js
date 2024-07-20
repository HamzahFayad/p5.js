class CodeScene {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, random(2, 10));
        this.acc = createVector(0, 0);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    display() {
        image(binaryImg, this.pos.x, this.pos.y, 12, 1214);
    }

    edges() {
        if (this.pos.y > height + 1200) {
            this.pos.y = -1200;
        }
    }

    resetPosition() {
        this.pos.y = random(-4000, -2000);
    }
}

class Fallen{
    constructor(x,y) {
        this.pos = createVector(x,y);
        this.vel = createVector(0, random(3,5));
        this.catch = false;
    }

    update(){
        this.pos.add(this.vel);
    }
    display(){
        if(this.catch){
            fill(238,28,93);
            ellipse(this.pos.x,this.pos.y,26,26);
        }
        else{
        image(p5Logo,this.pos.x,this.pos.y,30,30);
        }
    }
    target() {
        let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        if (distance < 30 && !this.catch) {
          this.catch = true;
          caughtLogos++; 
          if (caughtLogos >= 8) {
            unlockedImg = true;
            randomNewMe = random(meNewImgs);
          }
        }
      }
    edges(){
        if (this.pos.y > height + 100) {
            this.pos.y = random(-500,-1000);
            this.catch = false;
            if (caughtLogos >= 8) {
            caughtLogos = 0;
            setTimeout(() => {unlockedImg = false}, 4000);
            }
        }
    }

    resetPosition() {
        this.pos.y = random(-500, -1000);
    }
}

let imgIndex = 0;
class PhotoScene {
    constructor(imgs) {
        this.pos = createVector(random(width + 50, width + 200), random(0, height/2));
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(1.4,1.8));
        this.acc = createVector(0, 0);
        this.maxSpeed = 15;
        this.angle = random(TWO_PI);
        this.angleVel = random(-0.01, 0.01);

        this.img = imgs[imgIndex];
        imgIndex = (imgIndex + 1) % imgs.length;

        this.imgW = 80;
        this.imgH = 45;
        this.sizeW = this.imgW;
        this.sizeH = this.imgH;
        this.mouseHovered = false;
    }

    addForce(force) {
        this.acc.add(force);
    }

    updateSize() {
        this.sizeW = map(this.pos.y, 0, height, this.imgW * 0.65, this.imgW * 1.95);
        this.sizeH = map(this.pos.y, 0, height, this.imgH * 0.65, this.imgH * 1.95);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        if(!this.mouseHovered){
        this.angle += this.angleVel;
        } 
    }

    display() {
        this.updateSize();
        push();
        fill(255);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rectMode(CENTER);
        rect(-25 + this.sizeW / 2,-20 + this.sizeH / 2,this.sizeW+20,this.sizeH+30);
        image(this.img, -25, -20, this.sizeW, this.sizeH);
        pop();
    }

    isHovered() {
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        return d < max(this.sizeW, this.sizeH) / 2;
    }

    showPhoto() {
        this.imgW = 240;
        this.imgH = 135;
        this.mouseHovered = true; 
        this.angle = 0; 
    }

    leavePhoto() {
        this.imgW = 80;
        this.imgH = 45;
        this.angle += this.angleVel;
    }

    edges() {
        if (this.pos.x > width + 100) {
            this.pos.x = -100;
        }
        if (this.pos.x < -100) {
            this.pos.x = width + 100;
        }
        if (this.pos.y > height + 100) {
            this.pos.y = -100;
        }
        if (this.pos.y < -100) {
            this.pos.y = height + 100;
        }
    }
    resetPosition() {
        this.pos.x = random(width + 50, width + 200);
    }
}


class TravelScene{
    constructor(x,y) {
        this.pos = createVector(x,y);
        this.speed = 5;
        this.rectW = random(230,330);
        this.targetRectW = this.rectW;
        this.rectH = height;
        this.targetPosY = this.pos.y;
        this.colorOff = random(-60, 60);
        this.borderR = random(0,8);
    }
    update() {
        this.pos.x -= this.speed;
        this.rectW += (this.targetRectW - this.rectW) * 0.1;
        this.pos.y += (this.targetPosY - this.pos.y) * 0.1;
        if (random(1) < 0.005) { 
            this.targetRectW = random(100, 200);
        }
        if (random(1) < 0.005) {
            this.targetPosY = random(height*0.2, height*0.75);
        }
        if (random(1) < 0.005) {
            this.colorOff = random(-60, 60);
        }
    }
    display() {
        let alphaVal = map(bgCol,0,255,220,255);
        let r = 80;
        let g = 60 + this.colorOff/2;
        let b = 100 + this.colorOff;
        fill(r,g,b,alphaVal); 
        rect(this.pos.x, this.pos.y, this.rectW, this.rectH, this.borderR); 
        image(windowlights,this.pos.x+5,this.pos.y+10,this.rectW-10,65);
        image(windowlights,this.pos.x+5,this.pos.y+75,this.rectW-10,65)
        image(windowlights,this.pos.x+5,this.pos.y+135,this.rectW-10,65);
    }
    edges() {
        if(this.pos.x < -150){
            this.pos.x = width;
        }
    }

    drawWindows() {
        let windowW = 6;
        let windowH = 6;
        let gap = 5;
        let rows = floor((this.rectH - 50) / (windowH + gap));
        let cols = floor((this.rectW - 50) / (windowW + gap));

        fill(255, 255, 200, 200);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = this.pos.x + 10 + col * (windowW + gap);
                let y = this.pos.y + 10 + row * (windowH + gap);
                rect(x, y, windowW, windowH);
            }
        }
    }

    reset() {
        this.targetRectW = random(60, 160);
        this.targetPosY = random(height*0.2, height*0.75);
        this.colorOff = random(-60, 60);
    }
}