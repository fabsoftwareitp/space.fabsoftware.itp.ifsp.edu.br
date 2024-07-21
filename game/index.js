import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import Score from "./Score.js";
import PlayAgainButton from "./PlayAgainButton.js";
import { User } from "./User.js";
// import fs from 'fs';
// import path from "path";

// const jsonPath = path.join(__dirname + '/../ranking.json');
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const userNameInput = document.querySelector("#name");
const host = window.location.origin;

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
let user = new User();
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
    user.setScore(score.scoreNumber);
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
  user.reset();
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

// buttonStart.addEventListener("touchstart", e => {
//   if (userNameInput == '') {
//     console.log('insira um nome');
//   } else {
//     let user = new User(userNameInput.value);
//     console.log(userNameInput.value);
//     game();
//     canvas.requestFullscreen();
//     screen.orientation.lock("landscape-primary");
//   }
// });

screen.orientation.addEventListener("change", async () => {
  //userNameInput.value = userNameInput.value.toUpperCase();
  let nameRepeat = false;
  const resJson = await res.json();
  console.log(resJson);

  if (resJson.find((player) => player.name == userNameInput.value)) {
    nameRepeat = true;
  }

  if (userNameInput.value == "") {
    window.alert("insira um nome");
  } else if (userNameInput.value.length > 5) {
    window.alert("o nome só pode ter até 5 caracteres");
  } else if (nameRepeat) {
    window.alert("esse nome já existe");
  } else {
    switch (screen.orientation.type) {
      case "landscape-primary":
      case "landscape-secondary":
        user.setName(userNameInput.value);
        canvas.style = "display: block;";
        canvas.requestFullscreen();
        screen.orientation.lock("landscape-primary");
        game();
        break;
      case "portrait-primary":
      case "portrait-secondary":
        stopGame();
        resetGame();
        canvas.style = "display: none;";
        break;
    }
  }
});

document.addEventListener("touchstart", (e) => {
  let pos = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
  };

  if (playAgainButton.isClicked(e) && isGameOver) {
    resetGame();
  }
});
