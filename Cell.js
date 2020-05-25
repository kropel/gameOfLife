class Cell {
  constructor(alive, siblingsPositions, board) {
    this.alive = alive;
    this.siblingsPositions = siblingsPositions;
    this.aliveSiblings = 0;
    this.sibligs = [];
    this.board = board;
  }

  addSiblings(boardOfCells) {
    this.siblingsPositions.forEach(({ x, y }) =>
      this.sibligs.push(boardOfCells[y][x])
    );
  }
  livesCounter() {
    this.aliveSiblings = 0;
    this.sibligs.forEach((cell) => {
      cell.alive ? ++this.aliveSiblings : "";
    });
  }
  checkLifeOrDeth() {
    if (this.alive) {
      if (this.aliveSiblings < 2 || this.aliveSiblings > 3) {
        this.alive = false;
        dying();
      } else {
        if (this.aliveSiblings === 3) {
          this.alive === true;
          birth();
        }
      }
    }
  }
  dying() {
    this.board.addToDeathList(this);
    this.board.removeFromLiveList(this);
  }
  birth() {}
}

module.exports = Cell;
