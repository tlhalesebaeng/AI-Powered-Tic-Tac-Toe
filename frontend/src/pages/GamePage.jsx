import { useEffect, useRef, useState } from 'react';
import { WINNING_COMBINATIONS } from '../winning-combinations';
import './GamePage.css';
import GameBoard from '../components/GameBoard';
import History from '../components/History';
import PlayerTurn from '../components/PlayerTurn';
import ResultModal from '../components/ResultModal';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../socket';

let GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveWinner() {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol = GAME_BOARD[combination[0].row][combination[0].col];
        const secondSymbol = GAME_BOARD[combination[1].row][combination[1].col];
        const thirdSymbol = GAME_BOARD[combination[2].row][combination[2].col];

        if (firstSymbol !== null) {
            if (
                firstSymbol === secondSymbol &&
                firstSymbol === thirdSymbol &&
                secondSymbol === thirdSymbol
            ) {
                winner = firstSymbol;
            }
        }
    }

    return winner;
}

function hasDraw() {
    for (let row = 0; row < GAME_BOARD.length; row++) {
        for (let col = 0; col < GAME_BOARD.length; col++) {
            if (GAME_BOARD[row][col] === null) {
                return false;
            }
        }
    }

    return true;
}

function resetBoard() {
    const len = GAME_BOARD.length;
    for (let r = 0; r < len; r++) {
        for (let c = 0; c < len; c++) {
            GAME_BOARD[r][c] = null;
        }
    }
}

export default function GamePage({}) {
    const [turn, setTurn] = useState({
        moves: [],
        history: {
            X: 0,
            draw: 0,
            O: 0,
        },
        currentTurn: 'player x',
    });

    useEffect(() => {
        socket.on('receive_move', (data) => {
            const { rowIndex, colIndex, symbol } = data;
            GAME_BOARD[rowIndex][colIndex] = symbol;
            setTurn((prevState) => {
                const newTurn = symbol === 'X' ? 'player o' : 'player x';
                return { ...prevState, currentTurn: newTurn };
            });
        });
    }, [socket]);

    const dialogRef = useRef();
    const navigate = useNavigate();
    const { roomId } = useParams();

    const { currentTurn, history } = turn;
    let winner = deriveWinner();
    let draw = hasDraw();

    let result;
    if (winner) {
        result = winner;
        dialogRef.current.open();
    } else if (draw) {
        result = 'draw';
        dialogRef.current.open();
    } else {
        result = '';
    }

    function handleCurrentTurn(rowIndex, colIndex) {
        setTurn((prevState) => {
            const newTurn =
                prevState.currentTurn === 'player x' ? 'player o' : 'player x';
            const symbol = prevState.currentTurn === 'player x' ? 'X' : 'O';
            GAME_BOARD[rowIndex][colIndex] = symbol;
            const move = { row: rowIndex, col: colIndex, symbol };
            const newMoves = [...prevState.moves, move];

            socket.emit('make_move', {
                rowIndex,
                colIndex,
                symbol,
                room: roomId.toLowerCase(),
            });

            return { ...prevState, moves: newMoves, currentTurn: newTurn };
        });
    }

    function handleReplay() {
        resetBoard();
        setTurn((prevState) => {
            const newTurn = { ...prevState, currentTurn: 'player x' };
            if (winner) {
                newTurn.history[winner]++;
                winner = '';
            } else if (draw) {
                newTurn.history['draw']++;
                draw = '';
            }
            return newTurn;
        });

        dialogRef.current.close();
    }

    function handleGoToHome() {
        navigate('/type');
        setTurn({
            moves: [],
            history: {
                X: 0,
                draw: 0,
                O: 0,
            },
            currentTurn: 'player x',
        });
        resetBoard();
        dialogRef.current.close();
    }

    return (
        <>
            <ResultModal
                onHome={handleGoToHome}
                onReplay={handleReplay}
                result={result}
                ref={dialogRef}
            />
            <div className="container">
                <History history={history} />
                <GameBoard
                    onSelectSquare={handleCurrentTurn}
                    board={GAME_BOARD}
                />
                <PlayerTurn turn={currentTurn} />
            </div>
        </>
    );
}
