// Define html elements
const logo = document.getElementById('logo');
const gameBoard = document.getElementById('gameBoard');
const instructionText = document.getElementById('instructionText');

// Define game variables
const boardSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw gameBoard, snake, food
function draw() {
  gameBoard.innerHTML = '';
  drawSnake();
  drawFood();
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
    clearInterval(); // Clear past interval
    gameInterval = setInterval(() => {
      moveSnake();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

function startGame() {
  gameStarted = true; // Keep track of a running game
  instructionText
}