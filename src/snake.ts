
enum Direction {
    UP,
    DOWN,
    RIGHT,
    LEFT
};


class Snake {
    private snake: string[] = [];
    private Rows = 20;
    private Columns = 20;
    readonly moveSnakeInterval = 500; //ms
    private gameArea: HTMLElement;
    readonly defaultSnakeLength = 5;
    private nextHeadDirection: Direction = Direction.RIGHT;
    private intervalhandle: number;
    private snakeCrashEvent = new CustomEvent('snakeCrash', { bubbles: true, detail: new Error("snake has crashed") });

    constructor(gameArea?: HTMLElement) {
        this.gameArea = gameArea || document.getElementById('grid') || document.body;
    }

    initializeGame() {
        this.createGrid();
        this.addKeyPressListener();
        this.createSnake();
        this.startInterval();
    }

    startInterval() {
        let self = this;
        this.intervalhandle = setInterval(function () {
            self.moveSnake();
        }, this.moveSnakeInterval);
    }

    stopInterval() {
        clearInterval(this.intervalhandle);
    }

    addKeyPressListener() {
        let self = this;
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            self.recognizeKeyPress(event);
        });
    }

    createGrid() {
        this.gameArea = document.getElementById('grid') || document.body;
        let grid = new Grid(this.Rows, this.Columns, this.gameArea);
        grid.createGrid();
    }

    createSnake() {
        // Create default Snake
        this.snake = ['r-10-c-8', 'r-10-c-9', 'r-10-c-10', 'r-10-c-11', 'r-10-c-12'];
        this.renderSnake();
    }

    // Move each cell into the direction of it's next cell
    moveSnake() {
        this.clearRenderedSnake();
        this.moveSnakeByOneStep();
        //Move the head
        let snakeLength = this.snake.length;
        this.snake[snakeLength - 1] = this.moveCellToDirection(this.nextHeadDirection, this.snake[snakeLength - 1]);
        this.renderSnake();
    }

    moveSnakeByOneStep() {
        for (let i = 0; i < this.snake.length - 1; i++) {
            this.snake[i] = this.snake[i + 1];
        }
    }

    // Gets the direction for head
    getNextHeadDirection() {
        return this.nextHeadDirection;
    }

    // Identify the direction of the next Cell
    getNextCellDirection(currentCell: string, nextCell: string) {

    }

    moveCellToDirection(nextDirection: Direction, cellId: string): string {

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

    }

    calculateCellIdForNextMove(cellId: string, processFunction: Function, processCellFunnction: Function): string {
        let splitId = cellId.split('-');
        return processFunction(splitId, processCellFunnction);
    }

    processColumn(splitId: string[], processCellFunnction: Function) {
        let columnNumber = parseInt(splitId[3]);
        if ((columnNumber == this.Columns - 1 && processCellFunnction == this.increaseParam)
            || (columnNumber == 0 && processCellFunnction == this.decreaseParam)) {
            this.gameOverEvent();
        } else {
            splitId[3] = processCellFunnction(columnNumber).toString();
        }
        return splitId.join('-');
    }

    processRow(splitId: string[], processCellFunnction: Function) {
        let rowNumber = parseInt(splitId[1]);
        if ((rowNumber == this.Rows - 1 && processCellFunnction == this.increaseParam)
            || (rowNumber == 0 && processCellFunnction == this.decreaseParam)) {
            this.gameOverEvent();
        } else {
            splitId[1] = processCellFunnction(rowNumber).toString();
        }
        return splitId.join('-');
    }

    gameOverEvent() {
        console.log('throwing the crash event')
        this.stopInterval();
        this.gameArea.dispatchEvent(this.snakeCrashEvent);
    }

    increaseParam(param: number) {
        return param + 1;
    }

    decreaseParam(param: number) {
        return param - 1;
    }

    recognizeKeyPress(event: KeyboardEvent) {
        let keyCode: number = event.keyCode;
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

    }

    // Renders the current Snake
    renderSnake() {
        this.snakeIterator(this.makeCellAlive);
    }

    makeCellAlive(cell: HTMLElement) {
        cell.classList.add('alive');
    }

    clearRenderedSnake() {
        this.snakeIterator(this.clearCell)
    }

    clearCell(cell: HTMLElement) {
        cell.classList.remove('alive')
    }

    // Iterates over snake to execute funtion
    snakeIterator(executeFn: Function) {
        for (let i = 0; i < this.snake.length; i++) {
            let ele = document.getElementById(this.snake[i]);
            executeFn(ele);
        }
    }
}