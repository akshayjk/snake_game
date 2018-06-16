
enum Direction {
    UP,
    DOWN,
    RIGHT,
    LEFT
};


class Snake {
    private snake: string[] = [];
    readonly defaultSnakeLength = 5;
    private nextHeadDirection: Direction = Direction.RIGHT;
    private intervalhandle:number;

    constructor() {

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
        }, 1000);
    }

    stopInterval(){
        clearInterval(this.intervalhandle);
    }

    addKeyPressListener() {
        let self = this;
        document.addEventListener("keydown", (event:KeyboardEvent)=>{
            self.recognizeKeyPress(event);
        });
    }

    createGrid() {
        let gridBody = document.getElementById('grid');
        let grid = new Grid(20, 20, gridBody);
        grid.createGrid();
    }

    createSnake() {
        // Create default Snake
        this.snake = ['r-10-c-8', 'r-10-c-9', 'r-10-c-10', 'r-10-c-11', 'r-10-c-12'];
        this.renderSnake();
    }

    // Move each cell into the direction of it's next cell
    moveSnake() {
        console.log('interval handle ' + this.intervalhandle);
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
                return this.calculateCellIdForNextMove(cellId, this.processRow, this.decreaseParam);
            case Direction.DOWN:
                return this.calculateCellIdForNextMove(cellId, this.processRow, this.increaseParam);
            case Direction.RIGHT:
                return this.calculateCellIdForNextMove(cellId, this.processColumn, this.increaseParam);
            case Direction.LEFT:
                return this.calculateCellIdForNextMove(cellId, this.processColumn, this.decreaseParam);
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
        splitId[3] = processCellFunnction(parseInt(splitId[3])).toString();
        return splitId.join('-');
    }

    processRow(splitId: string[], processCellFunnction: Function) {
        splitId[1] = processCellFunnction(parseInt(splitId[1])).toString();
        return splitId.join('-');
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