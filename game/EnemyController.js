import Enemy from "./Enemy.js";
import Imortal from "./Imortal.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController {
  enemyMap = [
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];
  enemyRows = [];
  imortalRows = [];

  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 1;
  defaultYVelocity = 1;
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;

  constructor(canvas, enemyBulletController, playerBulletController, score) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;
    this.score = score;

    this.enemyDeathSound = new Audio("sounds/enemy-death.wav");
    this.enemyDeathSound.volume = 0.1;

    this.createEnemies();
  }

  draw(ctx) {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  collisionDetection() {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          this.enemyDeathSound.currentTime = 0;
          this.enemyDeathSound.play();
          enemyRow.splice(enemyIndex, 1);

          this.score.addPoints();
        }
      });
    });

    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  collisionDetection() {
    this.imortalRows.forEach((imortalRow) => {
      imortalRow.forEach((imortal, imortalIndex) => {
      });
    });

    this.imortalRows = this.imortalRows.filter((imortalRow) => imortalRow.length > 0);
  }

  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
    }
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  decrementMoveDownTimer() {
    if (
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  updateVelocityAndDirection() {
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection == MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          this.increaseXVelocity();
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          this.increaseXVelocity();
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  updateVelocityAndDirection() {
    for (const imortalRow of this.imortalRows) {
      if (this.currentDirection == MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostImortal = imortalRow[imortalRow.length - 1];
        if (rightMostImortal.x + rightMostImortal.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          this.increaseXVelocity();
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = imortalRow[0];
        if (leftMostImortal.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          this.increaseXVelocity();
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  drawEnemies(ctx) {
    this.enemyRows.flat().forEach((enemy) => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.draw(ctx);
    });
  }

  drawImortals(ctx) {
    this.imortalRows.flat().forEach((imortal) => {
      imortal.move(this.xVelocity, this.yVelocity);
      imortal.draw(ctx);
    });
  }

  happy = () => {};

  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemyNubmer, enemyIndex) => {
        if (enemyNubmer > 0) {
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, rowIndex * 35, enemyNubmer)
          );
        }
      });
    });
  }

  createImortals() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.imortalRows[rowIndex] = [];
      row.forEach((imortalNubmer, imortalIndex) => {
        if (imortalNubmer > 0) {
          this.imortalRows[rowIndex].push(
            new Imortal(imortalIndex * 50, rowIndex * 35, imortalNubmer)
          );
        }
      });
    });
  }

  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }

  collideWith(sprite) {
    return this.imortalRows.flat().some((imortal) => imortal.collideWith(sprite));
  }

  increaseXVelocity() {
    this.defaultXVelocity += 0.25;
    this.score.decreaseMultiplier();
  }
}
