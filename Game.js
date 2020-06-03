class Game {
  constructor(board) {
    this.board = board;
    this.snapShots = this.getSnapShots();
  }
  getSnapShots(board = null, number = 100) {
    //jezeli dostane tablice [[true,false,...], [false,true,...], ...]
    if (!!board) {
      board.forEach((row, indexY) =>
        row.forEach((item, indexX) => (this.board[indexY][indexX].alive = item))
      );
    }

    let snap = () => this.board.map((row) => row.map((item) => item.alive));
    let snapShots = [snap()];

    while (number-- > 0) {
      this.board.forEach((row) => row.forEach((item) => item.livesCounter()));

      this.board.forEach((row) =>
        row.forEach((item) => item.checkLifeOrDeth())
      );

      snapShots.push(snap());
    }
    this.snapShots = snapShots;
    return snapShots;
  }
}

module.exports = Game;
