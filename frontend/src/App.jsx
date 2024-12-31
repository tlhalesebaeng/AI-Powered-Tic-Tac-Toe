import "./App.css";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function App() {
  const turn = "player x";

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
                      <button className="btn-player-symbol">
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
