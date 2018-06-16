/**
 * Creates the grid onto the screen
 */

class Grid {
    Rows: number;
    Columns: number;
    ParentElement: HTMLElement;

    constructor(rows: number, columns: number, parentElement: HTMLElement) {
        this.Rows = rows;
        this.Columns = columns;
        this.ParentElement = parentElement;
        this.loadGridCSS();
    }

    subMethod(){
        
    }

    createGrid() {
        let cellWidth = 1 / this.Rows * 100;
        let cellHeight = 1 / this.Columns * 100;
        let grid = this.ParentElement;
        // Clear grid completely
        while (grid.lastChild) {
            grid.removeChild(grid.lastChild);
        }

        for (let i = 0; i < this.Rows; i++) {

            let row = document.createElement('div');
            row.className = 'grid-row';
            row.id = 'row-' + i;
            row.style.height = cellHeight + '%';
            grid.appendChild(row);
            for (let j = 0; j < this.Columns; j++) {
                let cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.width = cellWidth.toString() + '%';
                cell.style.height = '100%';
                cell.id = 'r-' + i + '-c-' + j;
                row.appendChild(cell);
            }

        }
    }

    loadGridCSS() {
        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.id = "gridCSS";
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './lib/grid.css';
        link.media = 'all';
        head.appendChild(link);
    }
}