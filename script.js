const board = document.querySelector("#gBoard");
const ctx = board.getContext("2d");
const boxSize = 18;
const cols = 18;
const rows = 18;
board.width = cols * boxSize;
board.height = rows * boxSize;
const scoreBlock = document.querySelector(".score");
const overlay = document.querySelector(".overlay");
const startEndBtn = document.querySelector(".overlay a");
const startEndTitle = document.querySelector(".start-game");
const finalScore = document.querySelector(".final-score");
const controls = document.querySelectorAll(".controls .controls-btn");

// snake head
let snakeX = 10 * boxSize;
let snakeY = 10 * boxSize;

// snake body
let snakeBody = [];

// food
let foodX;
let foodY;

// moveSnake
let velocityX = 0;
let velocityY = 0;

// score
let score = 0;

// gameOver
let gameOver = false;

startEndBtn.addEventListener("click", function () {
  overlay.classList.add("toggle");
  if (gameOver) {
    overlay.classList.add("toggle");
    score = 0;
    scoreBlock.textContent = `Score: ${score}`;
    velocityX = 0;
    velocityY = 0;
    snakeX = 10 * boxSize;
    snakeY = 10 * boxSize;
    snakeBody = [];
    gameOver = false;
  }
});

window.onload = createGame();

function createGame() {
  placeFood();
  document.addEventListener("keyup", startGame);
  setInterval(update, 100);
}

function update() {
  if (gameOver) {
    return;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cols * boxSize, rows * boxSize);

  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, boxSize, boxSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    score++;
    scoreBlock.textContent = `Score: ${score}`;
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  snakeX += velocityX;
  snakeY += velocityY;

  ctx.fillStyle = "lime";
  ctx.fillRect(snakeX, snakeY, boxSize, boxSize);

  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize);
  }
  if (
    snakeX < 0 ||
    snakeX > cols * boxSize ||
    snakeY < 0 ||
    snakeY > rows * boxSize
  ) {
    gameOver = true;
    startEndTitle.textContent = "Game Over, you are looser!!!";
    startEndBtn.textContent = "Restart";
    finalScore.textContent = `Your final score: ${score}`;
    finalScore.classList.remove("toggle");
    overlay.classList.remove("toggle");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      startEndTitle.textContent = "Game Over, you are looser!!!";
      startEndBtn.textContent = "Restart";
      finalScore.textContent = `Your final score: ${score}`;
      finalScore.classList.remove("toggle");
      overlay.classList.remove("toggle");
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * 18) * boxSize;
  foodY = Math.floor(Math.random() * 18) * boxSize;
}

controls.forEach((code) => {
  code.addEventListener("click", () => startGame({ code: code.dataset.key }));
});

function startGame(event) {
  if (event.code == "ArrowUp" && velocityY != 18) {
    velocityX = 0;
    velocityY = -18;
  } else if (event.code == "ArrowDown" && velocityY != -18) {
    velocityX = 0;
    velocityY = 18;
  } else if (event.code == "ArrowLeft" && velocityX != 18) {
    velocityX = -18;
    velocityY = 0;
  } else if (event.code == "ArrowRight" && velocityX != -18) {
    velocityX = 18;
    velocityY = 0;
  }
}
