import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import Score from "./Score.js";
import PlayAgainButton from "./PlayAgainButton.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const background = new Image();
background.src = "images/space.png";

const playerBulletController = new BulletController(canvas, 1, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const score = new Score();
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController,
  score
);
const player = new Player(canvas, 3, playerBulletController);
const playAgainButton = new PlayAgainButton(canvas.width, canvas.height, "white");

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
    let text = didWin ? "Você Venceu" : "Você Perdeu";
    let textOffset = 5;

    ctx.fillStyle = "white";
    ctx.font = "48px 'Press Start 2P'";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    score.draw(ctx, canvas.width / textOffset, canvas.height / 4);
    console.log(playAgainButton);
    playAgainButton.draw(ctx);
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

screen.orientation.addEventListener('change', () => { 
  switch(screen.orientation.type) { 
    case 'landscape-primary': case 'landscape-secondary':
      setInterval(game, 1000 / 60);

      const startNotice = document.querySelector(".startNotice");
      startNotice.style = 'display: none;';
      
      document.addEventListener("click", () => {
        canvas.requestFullscreen();
      }); 
      break;  
  } 
});
