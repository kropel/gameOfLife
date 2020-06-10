import React from "react";
import Style from "./Board.module.css";
import Squer from "../Squer/Squer";

const Board = ({ board, clickListener, setSelect, selectBox }) => {
  let gameBoard = board.map((row, indexY) => (
    <div key={"" + indexY} className={Style.Row}>
      {row.map((cell, indexX) => {
        return (
          <Squer
            key={indexY + "" + indexX}
            alive={cell}
            onClick={() => clickListener(indexX, indexY)}
            onMouseDown={() => setSelect(true)}
            onMouseUp={() => setSelect(false)}
            onMouseEnter={() => selectBox(indexX, indexY)}
          />
        );
      })}
    </div>
  ));
  return gameBoard;
};

export default Board;
