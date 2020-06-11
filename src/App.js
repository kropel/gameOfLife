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
  const [isBoardChange, setBoardChange] = useState(false);

  let game = useMemo(() => {
    const boardClass = new BoardClass(startBoard, Cell);
    return new Game(boardClass.board);
  });

  const selectBox = (x, y) => {
    if (select) {
      const boardTemp = [...board];
      stop();
      boardTemp[y][x] = !boardTemp[y][x];
      setBoard(boardTemp);
      setBoardChange(true);
    }
  };

  const clickListener = (x, y) => {
    stop();
    const boardTemp = [...board];
    boardTemp[y][x] = !boardTemp[y][x];
    setBoard(boardTemp);
    setBoardChange(true);
  };

  const setNewShots = (board = null) => {
    if (board) {
      let newSnapShots = game.getSnapShots(board);
      setSnapShots(snapShots.slice(0, step).concat(newSnapShots));
    }
  };

  const nextStep = (next = null) => {
    next = next ?? step + 1;

    if (next > snapShots.length - 10) {
      setSnapShots(
        snapShots.concat(game.getSnapShots(snapShots[snapShots.length - 1]))
      );
    }

    if (snapShots.length > 0) {
      setBoard(snapShots[next]);
    }

    setStep(next);
  };

  const setIntervalCallback = useInterval(nextStep, isRunning ? delay : null);

  const start = () => {
    if (isBoardChange) {
      setBoardChange(false);
      setNewShots(board);
    }

    setIntervalCallback(nextStep);
    setRunning(true);
  };

  const stop = () => {
    setRunning(null);
  };

  const rangeSliderHandler = (e) => {
    stop();
    nextStep(Number(e.target.value));
  };

  const boardConfig = { board, clickListener, setSelect, selectBox };

  const faster = () => {
    setDelay(delay - delay / 2);
  };

  const slower = () => {
    setDelay(delay * 2);
  };

  const reset = () => {
    stop();
    const resetBoard = emptyBoard(width, heigth);
    setBoard(resetBoard);
    setSnapShots(resetBoard);
    setStep(0);
    setBoardChange(true);
  };

  return (
    <div className="App">
      <Board {...boardConfig} />
      <input
        type="range"
        value={step}
        min="0"
        max={snapShots.length - 1}
        onChange={rangeSliderHandler}
        disabled={isRunning}
      />
      <button
        onClick={() => {
          nextStep();
        }}
      >
        Next({step})
      </button>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <p>Speed: {delay}</p>
      <button onClick={faster}>Faster</button>
      <button onClick={slower}>Slower</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
