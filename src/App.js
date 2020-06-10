import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Board from "./Board/Board";
import BoardClass from "./services/Board";
import Game from "./services/Game";
import Cell from "./services/Cell";
import useInterval from "./hooks/useInterval";

let [width, heigth] = [40, 40];
const emptyBoard = (width, heigth) =>
  [...new Array(heigth)].map(() => [...new Array(width)].map(() => false));
const startBoard = emptyBoard(width, heigth);

function App() {
  const [step, setStep] = useState(0);
  const [snapShots, setSnapShots] = useState([[]]);
  const [board, setBoard] = useState(startBoard);
  const [select, setSelect] = useState(false);
  const [isRunning, setRunning] = useState(null);
  const [delay, setDelay] = useState(300);
  const boardTemp = [...board];

  let game = useMemo(() => {
    const boardClass = new BoardClass(startBoard, Cell);
    return new Game(boardClass.board);
  });

  const selectBox = (x, y) => {
    if (select) {
      boardTemp[y][x] = !boardTemp[y][x];
      setBoard(boardTemp);
    }
  };

  const clickListener = (x, y) => {
    boardTemp[y][x] = !boardTemp[y][x];
    setBoard(boardTemp);
  };

  const setNewShots = (board = null) => {
    if (board) {
      let newSnapShots = game.getSnapShots(board);
      setSnapShots(snapShots.slice(0, step + 1).concat(newSnapShots));
    }
  };

  const nextStep = () => {
    if (step > snapShots.length - 10) {
      setNewShots(snapShots[snapShots.length - 1]);
    }
    if (snapShots.length > 1) {
      setBoard(snapShots[step + 1]);
    }
    setStep(step + 1);
  };

  useInterval(nextStep, isRunning ? delay : null);

  const start = () => {
    setNewShots(board);
    setRunning(true);
  };

  const stop = () => {
    setRunning(null);
  };

  const rangeSliderHandler = (e) => {
    setStep(e.target.value);
    setBoard(snapShots[e.target.value]);
  };

  const boardConfig = { board, clickListener, setSelect, selectBox };

  return (
    <div className="App">
      <Board {...boardConfig} />
      <input
        type="range"
        value={step}
        min="0"
        max={snapShots.length - 1}
        onChange={rangeSliderHandler}
      />
      <button
        onClick={() => {
          nextStep(step);
        }}
      >
        Next({step})
      </button>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

export default App;
