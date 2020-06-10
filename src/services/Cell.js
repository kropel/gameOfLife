class Cell {
  constructor(alive, siblingsPositions) {
    this.alive = alive;
    this.siblingsPositions = siblingsPositions;
    this.aliveSiblings = 0;
    this.sibligs = [];
  }

  addSiblings(boardOfCells) {
    this.siblingsPositions.forEach(({ x, y }) =>
      this.sibligs.push(boardOfCells[y][x])
    );
  }
  livesCounter() {
    this.aliveSiblings = 0;
    this.sibligs.forEach((cell) => {
      if (cell.alive) ++this.aliveSiblings;
    });
  }
  checkLifeOrDeth() {
    if (this.alive) {
      if (this.aliveSiblings < 2 || this.aliveSiblings > 3) {
        this.alive = false;
      }
    } else {
      if (this.aliveSiblings === 3) {
        this.alive = true;
      }
    }
  }
}

module.exports = Cell;
