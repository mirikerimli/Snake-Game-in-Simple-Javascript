const board = document.querySelector("#gBoard");
const ctx = board.getContext("2d");
const boxSize = 25;
const cols = 20;
const rows = 20;
board.width = cols * boxSize;
board.height = rows * boxSize;
const scoreBlock = document.querySelector(".score");
const overlay = document.querySelector(".overlay");
const startEndBtn = document.querySelector(".overlay a");
const startEndTitle = document.querySelector(".start-game");

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
    console.log(scoreBlock);
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
    overlay.classList.remove("toggle");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      startEndTitle.textContent = "Game Over, you are looser!!!";
      startEndBtn.textContent = "Restart";
      overlay.classList.remove("toggle");
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * 20) * boxSize;
  foodY = Math.floor(Math.random() * 20) * boxSize;
}

function startGame(event) {
  if (event.code == "ArrowUp" && velocityY != 25) {
    velocityX = 0;
    velocityY = -25;
  } else if (event.code == "ArrowDown" && velocityY != -25) {
    velocityX = 0;
    velocityY = 25;
  } else if (event.code == "ArrowLeft" && velocityX != 25) {
    velocityX = -25;
    velocityY = 0;
  } else if (event.code == "ArrowRight" && velocityX != -25) {
    velocityX = 25;
    velocityY = 0;
  }
}
