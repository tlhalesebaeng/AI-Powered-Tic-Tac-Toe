import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';
import './App.css';
import GameBoard from './components/GameBoard';
import History from './components/History';
import PlayerTurn from './components/PlayerTurn';

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
    const [currentTurn, setCurrentTurn] = useState('player x');

    const winner = deriveWinner();
    const draw = hasDraw();

    if (winner) {
        console.log(winner + ' wins');
        //show winner modal
    } else if (draw) {
        console.log('draw');
    }

    function handleCurrentTurn(rowIndex, colIndex) {
        setCurrentTurn((prevState) => {
            const newTurn = prevState === 'player x' ? 'player o' : 'player x';
            INITIAL_GAME_BOARD[rowIndex][colIndex] =
                prevState === 'player x' ? 'X' : 'O';
            return newTurn;
        });
    }

    return (
        <main>
            <div className="container">
                <History />
                <GameBoard
                    onSelectSquare={handleCurrentTurn}
                    board={INITIAL_GAME_BOARD}
                />
                <PlayerTurn turn={currentTurn} />
            </div>
        </main>
    );
}
