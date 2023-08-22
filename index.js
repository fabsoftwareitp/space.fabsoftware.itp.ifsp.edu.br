import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import Score from "./Score.js";
import PlayAgainButton from "./PlayAgainButton.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = screen.height;
canvas.height = screen.width;

const background = new Image();
background.src = "images/space.png";

let playerBulletController = new BulletController(canvas, 1, "red", true);
let enemyBulletController = new BulletController(canvas, 4, "white", false);
let score = new Score();
let enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController,
  score
);
let player = new Player(canvas, 3, playerBulletController);
let playAgainButton = new PlayAgainButton(canvas);

let isGameOver = false;
let didWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();

  if (isGameOver) {
    // stopGame();
  }

  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    score.draw(ctx);
  }
  mygame = window.requestAnimationFrame(game);
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "Você Venceu" : "Você Perdeu";
    let textOffset = 5;

    ctx.fillStyle = "white";
    ctx.font = "48px 'Press Start 2P'";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    score.draw(ctx, canvas.width / textOffset, canvas.height / 4);
    playAgainButton.draw(ctx, "white");
  }
}

function resetGame() {
  playerBulletController = new BulletController(canvas, 1, "red", true);
  enemyBulletController = new BulletController(canvas, 4, "white", false);
  score = new Score();
  enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController,
    score
  );
  player = new Player(canvas, 3, playerBulletController);
  isGameOver = false;
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

let mygame = null;

function stopGame() {
  window.cancelAnimationFrame(mygame);
}

screen.orientation.addEventListener("change", () => {
  switch (screen.orientation.type) {
    case "landscape-primary":
    case "landscape-secondary":
      game();
      
      canvas.style = 'display: block;';
      canvas.requestFullscreen();
      screen.orientation.lock(screen.orientation.type);
      break;
    case "portrait-primary":
    case "portrait-secondary":
      stopGame()
      resetGame();
      canvas.style = 'display: none;';
      break;
  }
});

document.addEventListener("touchstart", (e) => {
  let pos = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
  };
  
  if (playAgainButton.isClicked(e, ctx) && isGameOver) {
    console.log("clicou no botao");
    resetGame();
  } else {
    console.log("clicou fora");
  }
});
