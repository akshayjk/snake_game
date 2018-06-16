(function () {
    const rows = 20;
    const cols = 20;
    var snake = [];
    createGrid(rows, cols);
    createSnake(6);
    moveSnake();

    function createGrid(Row, Col) {
        var rowVal = Row || 20;
        var colVal = Col || 20;

        // Get the El
        var grid = document.getElementById('grid');

        var cellWidth = 1 / colVal * 100;
        //console.log("cellWidth: " + String(cellWidth));

        var cellHeight = 1 / rowVal * 100;
        //console.log("cellHeight: " + String(cellHeight));

        // Clear grid completely
        while (grid.lastChild) {
            grid.removeChild(grid.lastChild);
        }

        for (var i = 0; i < rowVal; i++) {

            var row = document.createElement('div');
            row.className = 'grid-row';
            row.id = 'row-' + i;
            row.style.height = cellHeight + '%';
            grid.appendChild(row);
            for (var j = 0; j < colVal; j++) {
                var cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.width = cellWidth.toString() + '%';
                cell.style.height = '100%';
                cell.id = 'r-' + i + '-c-' + j;
                /* if (i % 2 == 0 && j % 2 == 0) {
                    cell.classList.add('alive');
                } else if (i % 2 != 0 && j % 2 != 0) {
                    cell.classList.add('alive');
                }
                cell.onclick = function () { this.classList.toggle('alive') } */
                //cell.innerHTML = 'a';

                row.appendChild(cell);

            }

        }
    }

    // Creates the array of cells 
    function createSnake(length) {
        var snakelength = length || 6;
        var row = getRandomInt(5, 10);
        var col = getRandomInt(5, 10);
        snake = [];
        for (var i = 0; i < snakelength; i++) {
            // create correct cell id
            var currentRow = row + i;
            var currentCol = col + i;
            var cellId = 'r-' + currentRow + '-c-' + col;
            snake.push(cellId);
        }

        //console.log(snake);
        renderSnakeArray(snake);

    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    // renders the snake
    function renderSnakeArray(snakeArray) {
        for (var i = 0; i < snakeArray.length; i++) {
            var cell = document.getElementById(snakeArray[i]);
            cell.classList.add('alive');
        }
    }

    function cleanRenderedSnake() {
        for (var i = 0; i < snake.length; i++) {
            var cell = document.getElementById(snake[i]);
            cell.classList.remove('alive');
        }
    }

    function moveSnake() {
        setInterval(() => {
            shiftSnakeDown();
        }, 500)
    }

    function shiftSnakeDown() {
        //console.log('shift')
        var temp = [];
        for (var i = 0; i < snake.length; i++) {
            temp[i] = snake[i];
        }

        cleanRenderedSnake();

        for (var j = 0; j < temp.length; j++) {
            var parsed = temp[j].split('-');
            //console.log('row' + parsed[1]);
            var imp = parseInt(parsed[1]) + 1;
            //console.log(imp);
            parsed[1] = (parseInt(parsed[1]) + 1).toString();
            //console.log( 'final'+parsed[1]);
            //console.log('final parsed');
            //console.log(parsed);
            temp[j] = parsed.join('-');
        }
        snake = temp;
        //console.log(snake);
        renderSnakeArray(snake);


    }


})()