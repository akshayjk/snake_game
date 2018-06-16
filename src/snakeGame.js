var snake = new Snake();
snake.initializeGame();
var startButton = document.getElementById('startButton');
var resetButton = document.getElementById('resetButton');
var stepButton = document.getElementById('stepButton');
var stopButton = document.getElementById('stopButton');
startButton.onclick = function startGame() {
    snake.startInterval();
};
resetButton.onclick = function resetGame() {
    snake.stopInterval();
    snake = null;
    snake = new Snake();
    snake.initializeGame();
};
stepButton.onclick = function moveSnakeByOneStep() {
    snake.moveSnake();
};
stopButton.onclick = function stopGame() {
    snake.stopInterval();
};
//# sourceMappingURL=snakeGame.js.map