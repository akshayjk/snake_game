
let snake = new Snake();
snake.initializeGame();

let startButton = document.getElementById('startButton');
let resetButton = document.getElementById('resetButton');
let stepButton = document.getElementById('stepButton');
let stopButton = document.getElementById('stopButton');

startButton.onclick = function startGame() {
    snake.startInterval();
};
resetButton.onclick = function resetGame() {
    snake.stopInterval();
    snake = null;
    snake = new Snake();
    snake.initializeGame();
}
stepButton.onclick = function moveSnakeByOneStep() {
    snake.moveSnake();
};
stopButton.onclick = function stopGame() {
    snake.stopInterval();
};
