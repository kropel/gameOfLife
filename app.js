const Cell = require("./Cell");
const Board = require("./Board");
const Game = require("./Game");

const getRamdamliTrueFalse = () => {
  const randomNamber = Math.floor(Math.random() * 10);
  return randomNamber > 3 ? true : false;
};

let snap = [...new Array(40)].map(() =>
  [...new Array(40)].map(() => getRamdamliTrueFalse())
);
const board = new Board(snap, Cell);
const game = new Game(board.board);

const showArray = (array) => {
  console.clear();
  array.forEach((row) => {
    let items = "";
    row.forEach((item) => (items += item ? "1 " : "0 "));
    console.log(items);
  });
};

(looper = (array) => {
  let counter = 0;
  let length = array.length - 1;
  (timer = () => {
    if (counter >= length) return;
    showArray(array[counter++]);
    console.log(counter);
    setTimeout(timer, 500);
  })();
})(game.snapShots);
