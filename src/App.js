import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Board from "./Board/Board";
import BoardClass from "./services/Board";
import Game from "./services/Game";
import Cell from "./services/Cell";

let [width, heigth] = [40, 40];
const emptyBoard = (width, heigth) =>
  [...new Array(heigth)].map(() => [...new Array(width)].map(() => false));
const startBoard = emptyBoard(width, heigth);

function App() {
  const [step, setStep] = useState(0);
  const [snapShots, setSnapShots] = useState(null);
  const [board, setBoard] = useState(startBoard);
  const [select, setSelect] = useState(false);
  const [loop, setLoop] = useState(null);
  const boardTemp = [...board];
  let inter = null;

  let game = useMemo(() => {
    const boardClass = new BoardClass(startBoard, Cell);
    return new Game(boardClass.board);
  }, [startBoard]);

  useEffect(() => {
    console.log("App.js redered...");
    return () => {
      console.log("App.js unmount...");
      clearInterval(loop);
    };
  }, []);

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

  const setNewShots = () => {
    let newSnapShots = game.getSnapShots(board);
    setSnapShots(newSnapShots);
    setStep(0);
  };

  const nextStep = (step) => {
    setStep(step + 1);
    if (snapShots) {
      setBoard(snapShots[step]);
    }
  };

  const start = () => {
    setNewShots();
    inter = setInterval(nextStep(step), 500, step);
  };

  const stop = () => {
    if (!!loop) {
      clearInterval(inter);
    }
  };

  const boardConfig = { board, clickListener, setSelect, selectBox };

  return (
    <div className="App">
      <Board {...boardConfig} />
      <button
        onClick={() => {
          nextStep(step);
        }}
      >
        Next({step})
      </button>
      <button onClick={setNewShots}>Ustaw tablice</button>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

export default App;
