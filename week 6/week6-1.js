// setup canvas

const paragraph = document.querySelector('p');
let count = 0;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

class Ball extends Shape {

    constructor(x, y, velX, velY, color, size){
        super(x, y, velX, velY);

        this.color = color;
        this.size = size;

        //it will exist, so start it existing

        this.exists = true;

    
        }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();


    }

    update() {
        this.x = this.x + this.velX;
        this.y = this.y + this.velY;
        
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0){
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height){
            this.velY = -(this.velY);
        }
        if ((this.y - this.size) <= 0){
            this.velY = -(this.velY);
        }
    }

    smash() {
        for (const ball of balls) {
            if (this !== ball && ball.exists) {
                const diffX = this.x - ball.x;
                const diffY = this.y - ball.y;
                const distance = Math.sqrt((diffX * diffX)+(diffY * diffY));

                if (distance < (this.size + ball.size)) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

class Evil extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20)

        this.color = "white";
        this.size = 10;

        window.addEventListener('keydown', (e) => {
            switch(e.key) {
              case 'a':
                this.x -= this.velX;
                break;
              case 'd':
                this.x += this.velX;
                break;
              case 'w':
                this.y -= this.velY;
                break;
              case 's':
                this.y += this.velY;
                break;
            }
          });
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBorder() {
        //add size to the x so that it cant go through the borders

        if ((this.x + this.size) >= width) {
            this.x -= this.size;
        }

        if ((this.x - this.size) <= 0) {
            this.x += this.size;
        }

        if ((this.y + this.size) >= height) {
            this.y -= this.size;
        }

        if ((this.y - this.size) <= 0) {
            this.y += this.size;
        }


    }

    smash() {
        for (const ball of balls) {
            if (ball.exists) {
                const diffX = this.x - ball.x;
                const diffY = this.y - ball.y;
                const distance = Math.sqrt((diffX * diffX) + (diffY * diffY));

                if (distance < this.size + ball.size) {
                    ball.exists = false;
                    count--;
                    paragraph.textContent = "Ball count: " + count;

                }
            }


        }
    }

}
const balls = [];

while (balls.length < 25 ) {
    const size = random(10, 20)
    const ball = new Ball(
        random(size, width - size),
        random(size, height - size),
        random(-8, 8),
        random(-8, 8),
        randomRGB(),
        size
    );

    balls.push(ball);
    count++;
    paragraph.textContent = "Ball count: " + count;
}

const evilBall = new Evil(random(0,width), random(0, height));

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if (ball.exists)
        ball.draw();
        ball.update();
        ball.smash();
        }
    evilBall.draw();
    evilBall.checkBorder();
    evilBall.smash();

    requestAnimationFrame(loop);
}

loop();


