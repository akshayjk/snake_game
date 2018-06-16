var Grid = (function () {
    function Grid(rows, columns, parentElement) {
        this.Rows = rows;
        this.Columns = columns;
        this.ParentElement = parentElement;
        this.loadGridCSS();
    }
    Grid.prototype.subMethod = function () {
    };
    Grid.prototype.createGrid = function () {
        var cellWidth = 1 / this.Rows * 100;
        var cellHeight = 1 / this.Columns * 100;
        var grid = this.ParentElement;
        while (grid.lastChild) {
            grid.removeChild(grid.lastChild);
        }
        for (var i = 0; i < this.Rows; i++) {
            var row = document.createElement('div');
            row.className = 'grid-row';
            row.id = 'row-' + i;
            row.style.height = cellHeight + '%';
            grid.appendChild(row);
            for (var j = 0; j < this.Columns; j++) {
                var cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.width = cellWidth.toString() + '%';
                cell.style.height = '100%';
                cell.id = 'r-' + i + '-c-' + j;
                row.appendChild(cell);
            }
        }
    };
    Grid.prototype.loadGridCSS = function () {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = "gridCSS";
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './lib/grid.css';
        link.media = 'all';
        head.appendChild(link);
    };
    return Grid;
}());
//# sourceMappingURL=Grid.js.map