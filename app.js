const Cell = require("./Cell");
const Board = require("./Board");
const Game = require("./Game");

const getRamdamliTrueFalse = () => {
  const randomNamber = Math.floor(Math.random() * 10);
  return randomNamber > 3 ? true : false;
};

let snap = [...new Array(20)].map(() =>
  [...new Array(20)].map(() => getRamdamliTrueFalse())
);
const board = new Board(snap, Cell);
const game = new Game(board);
console.log(game.snapShots);
