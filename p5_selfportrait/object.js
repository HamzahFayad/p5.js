class Cloud {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(-10, 0);
        this.acc = createVector(0, 0);
        this.sizeW = random(110, 130);
        this.sizeH = random(55, 62);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        if (this.pos.x < -50) {
            this.pos.x = random(width, width + 600);
            this.pos.y = random(0, height / 3);
        }
    }

    display() {
        if (currentScene === "coding" && surrealWorld) {
            image(pixelCloud,this.pos.x, this.pos.y, this.sizeW, this.sizeH);
        }
        else{
        fill(255, 255, 255, 200);
        noStroke();
        image(cloudImg, this.pos.x, this.pos.y, this.sizeW, this.sizeH*1.5);
        }
    }
}


class Tree {
    constructor(x, y, imgs) {
        this.pos = createVector(x, y);
        this.vel = createVector(-10, 0);
        this.img = random(imgs);

        this.imgW = 180;
        this.imgH = 330;
        this.sizeW = this.imgW;
        this.sizeH = this.imgH;
    }

    updateSize() {
        this.sizeW = map(this.pos.y, height * 0.8, height, this.imgW * 0.85, this.imgW * 1.5);
        this.sizeH = map(this.pos.y, height * 0.8, height, this.imgH * 0.85, this.imgH * 1.5);
    }

    update() {
        this.pos.add(this.vel);
        if (this.pos.x < -50) {
            this.pos.x = width + random(50, 300);
            this.pos.y = random(height * 0.8, height);
        }
    }

    display() {
        this.updateSize();
        push();
        imageMode(CENTER);
        image(this.img, this.pos.x, this.pos.y, this.sizeW, this.sizeH);
        pop();
    }
}


class Leaf {
    constructor(x,y) {
        this.pos = createVector(x,y);
        this.vel = createVector(random(-10,-15), random(-0.75,0.75));
        this.vel.mult(random(2.5,3.5));
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (this.pos.x < 0) {
            this.pos.x = random(width, width + 1000);
            this.pos.y = random(height*0.55,height);
        }
    }

    display(){
        noStroke();
        fill(60,180,100,250);
        ellipse(this.pos.x,this.pos.y, 26,10);
    }
}