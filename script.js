// Define html elements
const gameBoard = document.getElementById('gameBoard');

// Define game variables
let snake = [{x: 10, y: 10}];

// Draw gameBoard, snake, food
function draw() {
  gameBoard.innerHTML = '';
  drawSnake();
}

// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    gameBoard.appendChild(snakeElement);
  });
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