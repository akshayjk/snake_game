
let snake = new Snake();
snake.initializeGame();
let gameOverElement = document.getElementById('game_over');

let startButton = document.getElementById('startButton');
let resetButton = document.getElementById('resetButton');
let stepButton = document.getElementById('stepButton');
let stopButton = document.getElementById('stopButton');


let gridElement = document.getElementById('grid');
document.addEventListener('snakeCrash', (snakeCrashEvent) =>{
    console.log('snake Crashed');
    gameOverElement.innerHTML = "Game Over !";
    startButton.setAttribute('disabled', 'true');
    stepButton.setAttribute('disabled', 'true');
})

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
}
stepButton.onclick = function moveSnakeByOneStep() {
    snake.moveSnake();
};
stopButton.onclick = function stopGame() {
    snake.stopInterval();
};

function clearAll(){
    gameOverElement.innerHTML = "";
}
