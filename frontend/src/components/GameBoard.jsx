import { useContext } from 'react';
import './GameBoard.css';
import { GameContext } from '../store/game-context';

export default function GameBoard({ onSelectSquare, board, disableButton }) {
    const { gameType } = useContext(GameContext);

    return (
        <ul className="board-columns">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ul className="board-rows">
                        {row.map((playerSymbol, colIndex) => {
                            let disableButtonCheck = disableButton;
                            if (gameType === 'online multiplayer') {
                                if (disableButton) {
                                    disableButtonCheck = true;
                                } else {
                                    if (playerSymbol === null) {
                                        disableButtonCheck = false;
                                    } else {
                                        disableButtonCheck = true;
                                    }
                                }
                            } else {
                                disableButtonCheck = false;
                            }

                            return (
                                <li key={colIndex}>
                                    {
                                        <button
                                            disabled={disableButtonCheck}
                                            onClick={() =>
                                                onSelectSquare(
                                                    rowIndex,
                                                    colIndex
                                                )
                                            }
                                            className={`btn-player-symbol ${playerSymbol}`}
                                        >
                                            {playerSymbol}
                                        </button>
                                    }
                                </li>
                            );
                        })}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
