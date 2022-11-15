// setup canvas

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

class Ball {
    constructor(x, y, velX, velY, color, size){

    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
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
            if (this !== ball) {
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

class Evil {
    constructor(x, y){

        this.x = x;
        this.y = y;
        this.velX = 20;
        this.velY = 20;
        this.color = "white";
        this.size = 10;
        }
    
        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
    
    
        }
        
        
        window.addEventListener("keypress", (e) => {
            console.log(e.code);
            // switch (e.key) {
            //   case "a":
            //     this.x -= this.velX;
            //     break;
            //   case "d":
            //     this.x += this.velX;
            //     break;
            //   case "w":
            //     this.y -= this.velY;
            //     break;
            //   case "s":
            //     this.y += this.velY;
            //     break;
            // }
          };
        }
const balls = [];

while (balls.length < 50 ) {
    const size = random(20,40)
    const ball = new Ball(
        random(size, width - size),
        random(size, height - size),
        random(-8, 8),
        random(-8, 8),
        randomRGB(),
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.smash();
    }

    requestAnimationFrame(loop);
}

// loop();


