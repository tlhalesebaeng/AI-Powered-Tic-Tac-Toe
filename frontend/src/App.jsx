import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import "./App.css";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner() {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol =
      INITIAL_GAME_BOARD[combination[0].row][combination[0].col];
    const secondSymbol =
      INITIAL_GAME_BOARD[combination[1].row][combination[1].col];
    const thirdSymbol =
      INITIAL_GAME_BOARD[combination[2].row][combination[2].col];

    if (
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol &&
      secondSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
    }
  }

  return winner;
}

function hasDraw() {
  for (let row = 0; row < INITIAL_GAME_BOARD.length; row++) {
    for (let col = 0; col < INITIAL_GAME_BOARD.length; col++) {
      if (INITIAL_GAME_BOARD[row][col] === null) {
        return false;
      }
    }
  }

  return true;
}

export default function App() {
  const [turn, setTurn] = useState("player x");

  const winner = deriveWinner();
  const draw = hasDraw();

  if (winner) {
    console.log(winner + " wins");
    //show winner modal
  } else if (draw) {
    console.log("draw");
  }

  function turnHandler(rowIndex, colIndex) {
    //check if the block has no symbol yet(optimize this with disabled button)
    if (!INITIAL_GAME_BOARD[rowIndex][colIndex]) {
      setTurn((prevState) => {
        const newTurn = prevState === "player x" ? "player o" : "player x";
        INITIAL_GAME_BOARD[rowIndex][colIndex] =
          prevState === "player x" ? "X" : "O";
        return newTurn;
      });
    }
  }

  return (
    <main>
      <div className="container">
        <ul className="game-history">
          <li className="player-x-color">
            <h2>Player X</h2>
            <p>{0}</p>
          </li>
          <li className="draw-color">
            <h2>Draw</h2>
            <p>{0}</p>
          </li>
          <li className="player-o-color">
            <h2>Player O</h2>
            <p>{0}</p>
          </li>
        </ul>
        <ul className="board-columns">
          {INITIAL_GAME_BOARD.map((row, rowIndex) => (
            <li key={rowIndex}>
              <ul className="board-rows">
                {row.map((playerSymbol, colIndex) => (
                  <li key={colIndex}>
                    {
                      <button
                        onClick={() => turnHandler(rowIndex, colIndex)}
                        className={`btn-player-symbol ${playerSymbol}`}
                      >
                        {playerSymbol}
                      </button>
                    }
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div
          className={`player-turn-container ${
            turn === "player x" ? "player-x-color" : "player-o-color"
          }`}
        >
          <p>{turn === "player x" ? "X" : "O"} turn</p>
        </div>
      </div>
    </main>
  );
}
