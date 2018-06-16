var snake = new Snake();
snake.initializeGame();
var gameOverElement = document.getElementById('game_over');
var startButton = document.getElementById('startButton');
var resetButton = document.getElementById('resetButton');
var stepButton = document.getElementById('stepButton');
var stopButton = document.getElementById('stopButton');
var gridElement = document.getElementById('grid');
document.addEventListener('snakeCrash', function (snakeCrashEvent) {
    console.log('snake Crashed');
    gameOverElement.innerHTML = "Game Over !";
    startButton.setAttribute('disabled', 'true');
    stepButton.setAttribute('disabled', 'true');
});
startButton.onclick = function startGame() {
    clearAll();
    snake.startInterval();
};
resetButton.onclick = function resetGame() {
    clearAll();
    startButton.removeAttribute('disabled');
    stepButton.removeAttribute('disabled');
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
function clearAll() {
    gameOverElement.innerHTML = "";
}
//# sourceMappingURL=snakeGame.js.map