// Define html elements
const gameBoard = document.getElementById('gameBoard');

// Define game variables
const boardSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();

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

draw();