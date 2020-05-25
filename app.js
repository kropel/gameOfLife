const Cell = require("./Cell");

const getSiblingsPosition = ({ cellX, cellY }, { maxX, maxY }) => {
  let arraySiblings = [];
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
};

let [width, height] = [20, 20];
let board = [...new Array(height)].map((row, rowIndex) =>
  [...new Array(width)].map(
    (item, columnIndex) =>
      new Cell(
        false,
        getSiblingsPosition(
          { cellX: columnIndex, cellY: rowIndex },
          { maxX: width - 1, maxY: height - 1 }
        )
      )
  )
);
board.forEach((row) => row.forEach((item) => item.addSiblings(board)));
board.forEach((row) => row.forEach((item) => item.livesCounter()));
board.forEach((row) => row.forEach((item) => item.checkLifeOrDeth()));
console.log(board);
