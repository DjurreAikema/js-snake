// Define html elements
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const gameBoard = document.getElementById('gameBoard');
const instructionText = document.getElementById('instructionText');
const highScoreText = document.getElementById('highScore');

// Define game variables
const boardSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;

// Draw gameBoard, snake, food
function draw() {
  gameBoard.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore();
}

// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    gameBoard.appendChild(snakeElement);
  });
}

// Draw food
function drawFood() {
  if (!gameStarted) return;

  const foodElement = createGameElement('div', 'food');
  setPosition(foodElement, food);
  gameBoard.appendChild(foodElement);
}

// Create game element (snake/food)
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of a game element
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// Generate food position
function generateFood() {
  const x = Math.floor((Math.random() * boardSize) + 1);
  const y = Math.floor((Math.random() * boardSize) + 1);
  return {x, y};
}

// Moving the snake
function moveSnake() {
  const head = {...snake[0]};
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "right":
      head.x++;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
  }

  // Add new head and remove tail
  snake.unshift(head);

  // snake.pop();
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(() => {
      moveSnake();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

function startGame() {
  gameStarted = true; // Keep track of a running game
  instructionText.style.display = 'none';
  logo.style.display = 'none';

  gameInterval = setInterval(() => {
    moveSnake();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

function handleKeyPress(event) {
  if (!gameStarted && (event.code === 'Space' || event.key === ' ')) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
  if (gameSpeedDelay > 150) gameSpeedDelay -= 5;
  else if (gameSpeedDelay > 100) gameSpeedDelay -= 3;
  else if (gameSpeedDelay > 50) gameSpeedDelay -= 2;
  else if (gameSpeedDelay > 25) gameSpeedDelay -= 1;
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 1 || head.x > boardSize || head.y < 1 || head.y > boardSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  snake = [{x: 10, y: 10}];
  food = generateFood();
  direction = 'right';
  gameSpeedDelay = 200;

  stopGame()
  updateHighScore();
  updateScore();
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = 'block';
  logo.style.display = 'block';
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3, '0');
  }
  highScoreText.style.display = 'block';
}