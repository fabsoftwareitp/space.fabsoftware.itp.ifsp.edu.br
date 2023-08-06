import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const background = new Image();
background.src = "images/space.png";

const playerBulletController = new BulletController(canvas, 1, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const score = new Score(canvas);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController,
  score
);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    score.draw(ctx);
  }
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

window.addEventListener('orientationchange', () => { 
  if ( window.orientation == -90 || window.orientation == 90) { 
    setInterval(game, 1000 / 60);

    const startNotice = document.querySelector(".startNotice");
    startNotice.remove();
    
    document.addEventListener("click", () => {
      canvas.requestFullscreen();
    });
  }  
});
