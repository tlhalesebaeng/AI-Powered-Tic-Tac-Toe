import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Minimax from 'tic-tac-toe-minimax';
import GameBoard from './board/GameBoard';
import History from './score-history/History';
import PlayerTurn from './current-turn/PlayerTurn';
import ResultModal from '../../modals/result/ResultModal';
import socket from '../../../socket';
import { GameContext } from '../../store/game-context';
import { DetailsContext } from '../../store/details-context';
import { deriveWinner, hasDraw, resetBoard } from '../../controllers';

let GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GamePage() {
    const [turn, setTurn] = useState({
        moves: [],
        history: {
            X: 0,
            draw: 0,
            O: 0,
        },
        currentTurn: 'player-x',
    });

    const dialogRef = useRef();
    const navigate = useNavigate();
    const { roomId, difficulty } = useParams();
    const { gameType } = useContext(GameContext);
    const { details } = useContext(DetailsContext);
    const [disableButton, setDisableButton] = useState(
        details.userSymbol !== turn.currentTurn
    );

    useEffect(() => {
        socket.on('receive_move', (data) => {
            const { rowIndex, colIndex, symbol } = data;
            GAME_BOARD[rowIndex][colIndex] = symbol;
            setTurn((prevState) => {
                const newTurn = symbol === 'X' ? 'player-o' : 'player-x';
                return { ...prevState, currentTurn: newTurn };
            });
        });

        socket.on('receive_replay', (data) => {
            GAME_BOARD = resetBoard();
            setTurn(data.newTurn);
            dialogRef.current.close();
        });

        socket.on('receive_go_to_home', () => {
            navigate('/type');
            GAME_BOARD = resetBoard();
            setTurn(data.newTurn);
            dialogRef.current.close();
        });
    }, [socket]);

    const { currentTurn, history } = turn;

    let winner = deriveWinner(GAME_BOARD);
    let draw = hasDraw(GAME_BOARD);

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
            let newTurn =
                prevState.currentTurn === 'player-x' ? 'player-o' : 'player-x';
            const symbol = prevState.currentTurn === 'player-x' ? 'X' : 'O';
            GAME_BOARD[rowIndex][colIndex] = symbol;
            const move = { row: rowIndex, col: colIndex, symbol };
            let newMoves = [...prevState.moves, move];

            if (gameType === 'online multiplayer') {
                socket.emit('make_move', {
                    rowIndex,
                    colIndex,
                    symbol,
                    room: roomId.toLowerCase(),
                });
            }

            if (
                gameType === 'single player' &&
                newTurn === details.opponentSymbol
            ) {
                setDisableButton(true);
                const board = GAME_BOARD.flat();
                for (let i = 0; i < board.length; i++) {
                    if (!board[i]) {
                        board[i] = i;
                    }
                }
                const aiSymbol = symbol === 'X' ? 'O' : 'X';
                const symbols = {
                    huPlayer: symbol,
                    aiPlayer: aiSymbol,
                };

                const diff =
                    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

                const nextMove = Minimax.ComputerMove(board, symbols, diff);

                const r = Math.floor(nextMove / 3);
                const c = nextMove % 3;

                if (nextMove !== undefined) {
                    GAME_BOARD[r][c] = aiSymbol;
                }

                newTurn = 'player-x';
            }

            return { ...prevState, moves: newMoves, currentTurn: newTurn };
        });
    }

    function handleReplay() {
        GAME_BOARD = resetBoard();
        setTurn((prevState) => {
            const newTurn = { ...prevState, currentTurn: 'player-x' };
            if (winner) {
                newTurn.history[winner]++;
                winner = '';
            } else if (draw) {
                newTurn.history['draw']++;
                draw = '';
            }

            if (gameType === 'online multiplayer') {
                socket.emit('replay', { newTurn, room: roomId.toLowerCase() });
            }
            return newTurn;
        });

        dialogRef.current.close();
    }

    function handleGoToHome() {
        navigate('/type');
        setTurn(() => {
            const newTurn = {
                moves: [],
                history: {
                    X: 0,
                    draw: 0,
                    O: 0,
                },
                currentTurn: 'player-x',
            };
            if (gameType === 'online multiplayer') {
                socket.emit('go_to_home', {
                    newTurn,
                    room: roomId.toLowerCase(),
                });
            }

            return newTurn;
        });
        GAME_BOARD = resetBoard();
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
                    disableButton={disableButton}
                />
                <PlayerTurn turn={currentTurn} />
            </div>
        </>
    );
}
