export default class Player {
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;

  constructor(canvas, velocity, bulletController) {
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

    this.beta = 0;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 50;
    this.height = 48;
    this.center = this.x;
    this.image = new Image();
    this.image.src = "images/player.png";

    this.runShoot();

    window.addEventListener("deviceorientation", (e) => {
      switch (screen.orientation.type) {
        case "landscape-primary":
          this.beta = e.beta * 3;
          break;
        case "landscape-secondary":
          this.beta = -(e.beta * 3);
          break;
      }
      if(window.navigator.userAgent.includes("GT-N8000")) {
        this.move(this.alpha);
      } else {
        this.move(this.beta);
      }
    });
  }

  draw(ctx) {
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 7, 10);
    }
    //this.collideWithWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /*collideWithWalls() {
    //left
    if (this.x < 0) {
      this.x = 0;
    }

    //right
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }*/

  move(axis) {
    this.x = this.center + axis.toFixed(0) * 2;
    if (axis <= -(180)) {
      this.x = 0;
    }
    if (axis >= 180) {
      this.x = this.canvas.width - this.width;
    }
  }

  runShoot() {
    document.addEventListener("touchstart", () => {
      this.shootPressed = true;
    });
    document.addEventListener("touchend", () => {
      this.shootPressed = false;
    });
  }
}
