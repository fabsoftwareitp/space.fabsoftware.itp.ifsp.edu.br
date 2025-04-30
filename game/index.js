import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import Score from "./Score.js";
import { User } from "./User.js";

//Variáveis
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const userNameInput = document.querySelector("#name");
const startButton = document.getElementById("start");
const optionsButton = document.getElementById("options");
const closeOptionsButton = document.getElementById("closeOptions");
const audioToggleButton = document.getElementById("option1");
const modoToggleButton = document.getElementById("option2");
const containers = document.querySelectorAll('.container');
const host = window.location.origin;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const background = new Image();
background.src = "images/space.png";

//Variáveis do jogo
let isAudioEnabled = true;
let isModoIfEnabled = true;
let isGameOver = false;
let didWin = false;

let playerBulletController = new BulletController(canvas, 1, "red", isAudioEnabled);
let enemyBulletController = new BulletController(canvas, 4, "white", isAudioEnabled);
let score = new Score();
let enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController, score, isAudioEnabled);
let player = new Player(canvas, 3, playerBulletController);
let user = new User();

//Loop do jogo
function game() {
  checkGameOver();
  drawGame();
  
  if (!isGameOver) {
    requestAnimationFrame(game);
  }
}

function drawGame() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    score.draw(ctx);
  } else {
    displayGameOver();
  }
}

//Lógica do jogo
function displayGameOver() {
  const gameOverText = didWin ? "Você Venceu" : "Você Perdeu";
  
  ctx.fillStyle = "white";
  ctx.font = "48px 'Press Start 2P'";
  ctx.fillText(gameOverText, canvas.width / 5, canvas.height / 2);
  score.draw(ctx, canvas.width / 5, canvas.height / 4);
  
  user.setScore(score.scoreNumber);
  toggleGameOverButtons(true);
}

function toggleGameOverButtons(visible) {
  const action = visible ? 'remove' : 'add';
  document.getElementById("PlayAgainButton").classList[action]("hidden");
  document.getElementById("RankingButton").classList[action]("hidden");
}

//Estado do controle do jogo
function resetGame() {
  playerBulletController = new BulletController(canvas, 1, "red", isAudioEnabled);
  enemyBulletController = new BulletController(canvas, 4, "white", isAudioEnabled);
  score = new Score();
  enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController, score, isAudioEnabled);
  player = new Player(canvas, 3, playerBulletController);
  
  isGameOver = false;
  didWin = false;
  user.reset();
  toggleGameOverButtons(false);
}

function checkGameOver() {
  if (isGameOver) return;
  
  if (enemyBulletController.collideWith(player) || enemyController.collideWith(player)) {
    isGameOver = true;
  } else if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  } else {
    const allEnemiesPassed = enemyController.enemyRows.flat().every(enemy => enemy.y + enemy.height >= canvas.height);
    if (allEnemiesPassed) {
      isGameOver = true;
    }
  }
}

//Ativação do áudio e dos modos
function toggleAudio() {
  isAudioEnabled = !isAudioEnabled;
  updateAudioButton();
  
  playerBulletController.soundEnabled = isAudioEnabled;
  enemyBulletController.soundEnabled = isAudioEnabled;
  enemyController.setAudioEnabled(isAudioEnabled);
}

function updateAudioButton() {
  audioToggleButton.style.backgroundColor = isAudioEnabled ? "green" : "red";
  audioToggleButton.textContent = isAudioEnabled ? "Desativar áudio" : "Ativar áudio";
}

function toggleMode() {
  isModoIfEnabled = !isModoIfEnabled;

  if (isModoIfEnabled) {
    localStorage.setItem("modo_game", "ifsp");
    option2Button.style.backgroundColor = "green";
    option2Button.textContent = "MODO IFSP";
  } else {
    localStorage.setItem("modo_game", "original");
    option2Button.style.backgroundColor = "red";
    option2Button.textContent = "MODO ORIGINAL";
  }
}

function updateModeButton() {
  modoToggleButton.style.backgroundColor = isModoIfEnabled ? "green" : "red";
  modoToggleButton.textContent = isModoIfEnabled ? "MODO IFSP" : "MODO ORIGINAL";
}

//Visibilidade do menu
function showOptionsMenu() {
  toggleElementVisibility("optionsMenu", true);
  toggleElementVisibility("form", false);
}

function hideOptionsMenu() {
  toggleElementVisibility("optionsMenu", false);
  toggleElementVisibility("form", true);
}

function toggleElementVisibility(elementId, visible) {
  const element = document.getElementById(elementId);
  element.classList[visible ? 'remove' : 'add']('hidden');
}

//Eventos
closeOptionsButton.addEventListener('click', hideOptionsMenu);
optionsButton.addEventListener('click', showOptionsMenu);
audioToggleButton.addEventListener('click', toggleAudio);
modoToggleButton.addEventListener('click', toggleMode);

startButton.addEventListener('click', async () => {
  const name = userNameInput.value;
  
  if (!name) {
    alert('Insira um nome');
    return;
  }
  
  if (name.length > 5) {
    alert('O nome só pode ter até 5 caracteres');
    return;
  }

  const res = await fetch(`${host}/ranking`);
  const players = await res.json();
  
  if (players.find(player => player.name === name)) {
    alert("Esse nome já existe");
    return;
  }

  user.setName(name);
  resetGame();
  game();
  document.body.requestFullscreen();
  allHidden();
});

document.getElementById("PlayAgainButton").addEventListener('click', () => {
  if (isGameOver) {
    resetGame();
    game();
  }
});

document.getElementById("RankingButton").addEventListener('click', () => {
  if (isGameOver) {
    user.send();
    window.location.href = `${host}/ranking.html`;
  }
});

//Funções utilitárias
function allHidden() {
  containers.forEach(container => container.classList.add("hidden"));
  ['Rodape', 'logo', 'header'].forEach(className => {
    document.querySelector(`.${className}`).classList.add("hidden");
  });
}