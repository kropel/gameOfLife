class Game {
  constructor(board) {
    this.board = board.board;
    this.snapShots = this.getSnapShots();
  }
  getSnapShots(board = null, number = 100) {
    if (!!board) {
      board.forEach((row, indexY) =>
        row.forEach((item, indexX) => (this.board[indexY][indexX].alive = item))
      );
    }
    let snapShots = [];
    let snap = [...new Array(this.board.length)].map(() => [
      ...new Array(this.board[0].length),
    ]);
    while (number-- > 0) {
      this.board.forEach((row) => row.forEach((item) => item.livesCounter()));

      this.board.forEach((row) =>
        row.forEach((item) => item.checkLifeOrDeth())
      );

      this.board.forEach((row, indexY) =>
        row.forEach((item, indexX) => (snap[indexY][indexX] = item.alive))
      );
      snapShots.push(snap);
    }
    this.snapShots = snapShots;
    return snapShots;
  }
}

module.exports = Game;
