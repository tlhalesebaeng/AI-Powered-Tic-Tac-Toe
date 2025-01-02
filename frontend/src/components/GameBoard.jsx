import './GameBoard.css';

export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ul className="board-columns">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ul className="board-rows">
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                {
                                    <button
                                        disabled={playerSymbol !== null}
                                        onClick={() =>
                                            onSelectSquare(rowIndex, colIndex)
                                        }
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
    );
}
