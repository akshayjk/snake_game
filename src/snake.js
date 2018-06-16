var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["RIGHT"] = 2] = "RIGHT";
    Direction[Direction["LEFT"] = 3] = "LEFT";
})(Direction || (Direction = {}));
;
var Snake = (function () {
    function Snake(gameArea) {
        this.snake = [];
        this.Rows = 20;
        this.Columns = 20;
        this.moveSnakeInterval = 500;
        this.defaultSnakeLength = 5;
        this.nextHeadDirection = Direction.RIGHT;
        this.snakeCrashEvent = new CustomEvent('snakeCrash', { bubbles: true, detail: new Error("snake has crashed") });
        this.gameArea = gameArea || document.getElementById('grid') || document.body;
    }
    Snake.prototype.initializeGame = function () {
        this.createGrid();
        this.addKeyPressListener();
        this.createSnake();
        this.startInterval();
    };
    Snake.prototype.startInterval = function () {
        var self = this;
        this.intervalhandle = setInterval(function () {
            self.moveSnake();
        }, this.moveSnakeInterval);
    };
    Snake.prototype.stopInterval = function () {
        clearInterval(this.intervalhandle);
    };
    Snake.prototype.addKeyPressListener = function () {
        var self = this;
        document.addEventListener("keydown", function (event) {
            self.recognizeKeyPress(event);
        });
    };
    Snake.prototype.createGrid = function () {
        this.gameArea = document.getElementById('grid') || document.body;
        var grid = new Grid(this.Rows, this.Columns, this.gameArea);
        grid.createGrid();
    };
    Snake.prototype.createSnake = function () {
        this.snake = ['r-10-c-8', 'r-10-c-9', 'r-10-c-10', 'r-10-c-11', 'r-10-c-12'];
        this.renderSnake();
    };
    Snake.prototype.moveSnake = function () {
        this.clearRenderedSnake();
        this.moveSnakeByOneStep();
        var snakeLength = this.snake.length;
        this.snake[snakeLength - 1] = this.moveCellToDirection(this.nextHeadDirection, this.snake[snakeLength - 1]);
        this.renderSnake();
    };
    Snake.prototype.moveSnakeByOneStep = function () {
        for (var i = 0; i < this.snake.length - 1; i++) {
            this.snake[i] = this.snake[i + 1];
        }
    };
    Snake.prototype.getNextHeadDirection = function () {
        return this.nextHeadDirection;
    };
    Snake.prototype.getNextCellDirection = function (currentCell, nextCell) {
    };
    Snake.prototype.moveCellToDirection = function (nextDirection, cellId) {
        switch (nextDirection) {
            case Direction.UP:
                return this.calculateCellIdForNextMove(cellId, this.processRow.bind(this), this.decreaseParam);
            case Direction.DOWN:
                return this.calculateCellIdForNextMove(cellId, this.processRow.bind(this), this.increaseParam);
            case Direction.RIGHT:
                return this.calculateCellIdForNextMove(cellId, this.processColumn.bind(this), this.increaseParam);
            case Direction.LEFT:
                return this.calculateCellIdForNextMove(cellId, this.processColumn.bind(this), this.decreaseParam);
            default:
                console.log("Incorrect Direction !");
                break;
        }
    };
    Snake.prototype.calculateCellIdForNextMove = function (cellId, processFunction, processCellFunnction) {
        var splitId = cellId.split('-');
        return processFunction(splitId, processCellFunnction);
    };
    Snake.prototype.processColumn = function (splitId, processCellFunnction) {
        var columnNumber = parseInt(splitId[3]);
        if ((columnNumber == this.Columns - 1 && processCellFunnction == this.increaseParam)
            || (columnNumber == 0 && processCellFunnction == this.decreaseParam)) {
            this.gameOverEvent();
        }
        else {
            splitId[3] = processCellFunnction(columnNumber).toString();
        }
        return splitId.join('-');
    };
    Snake.prototype.processRow = function (splitId, processCellFunnction) {
        var rowNumber = parseInt(splitId[1]);
        if ((rowNumber == this.Rows - 1 && processCellFunnction == this.increaseParam)
            || (rowNumber == 0 && processCellFunnction == this.decreaseParam)) {
            this.gameOverEvent();
        }
        else {
            splitId[1] = processCellFunnction(rowNumber).toString();
        }
        return splitId.join('-');
    };
    Snake.prototype.gameOverEvent = function () {
        console.log('throwing the crash event');
        this.stopInterval();
        this.gameArea.dispatchEvent(this.snakeCrashEvent);
    };
    Snake.prototype.increaseParam = function (param) {
        return param + 1;
    };
    Snake.prototype.decreaseParam = function (param) {
        return param - 1;
    };
    Snake.prototype.recognizeKeyPress = function (event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case 37:
                this.nextHeadDirection = Direction.LEFT;
                break;
            case 38:
                this.nextHeadDirection = Direction.UP;
                break;
            case 39:
                this.nextHeadDirection = Direction.RIGHT;
                break;
            case 40:
                this.nextHeadDirection = Direction.DOWN;
                break;
            default:
                console.log("Forbidden key " + event.keyCode);
                break;
        }
    };
    Snake.prototype.renderSnake = function () {
        this.snakeIterator(this.makeCellAlive);
    };
    Snake.prototype.makeCellAlive = function (cell) {
        cell.classList.add('alive');
    };
    Snake.prototype.clearRenderedSnake = function () {
        this.snakeIterator(this.clearCell);
    };
    Snake.prototype.clearCell = function (cell) {
        cell.classList.remove('alive');
    };
    Snake.prototype.snakeIterator = function (executeFn) {
        for (var i = 0; i < this.snake.length; i++) {
            var ele = document.getElementById(this.snake[i]);
            executeFn(ele);
        }
    };
    return Snake;
}());
//# sourceMappingURL=snake.js.map