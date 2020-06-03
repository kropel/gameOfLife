class Board {
  constructor(board, Cell) {
    this.Cell = Cell;
    this.maxY = board.length - 1;
    this.maxX = board[0].length - 1;
    this.board = this.setBoard(board);
  }
  setBoard(board) {
    //setup of siblings positions array
    board = board.map((row, rowIndex) =>
      row.map(
        (item, columnIndex) =>
          new this.Cell(
            item,
            this.getSiblingsPosition(
              { cellX: columnIndex, cellY: rowIndex },
              { maxX: this.maxX, maxY: this.maxY }
            )
          )
      )
    );
    //setup cells sibling in cell.sibling array
    board.forEach((row) => row.forEach((cell) => cell.addSiblings(board)));
    this.board = board;
    return board;
  }
  getSiblingsPosition({ cellX, cellY }, { maxX, maxY }) {
    let arraySiblings = [];
    let minX = 0;
    let minY = 0;
    const getMinMax = (item, max) => [
      item === 0 ? 0 : item - 1,
      item === max ? max : item + 1,
    ];

    [minX, maxX] = getMinMax(cellX, maxX);
    [minY, maxY] = getMinMax(cellY, maxY);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (x === cellX && y === cellY) {
          continue;
        }
        arraySiblings.push({ x, y });
      }
    }
    return arraySiblings;
  }
}

module.exports = Board;
