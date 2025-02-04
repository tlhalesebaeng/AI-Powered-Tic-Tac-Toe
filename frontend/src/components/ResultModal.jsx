import { forwardRef, useContext, useEffect } from 'react';
import './ResultModal.css';
import Modal from './Modal';
import { DetailsContext } from '../store/details-context';
import { GameContext } from '../store/game-context';

const ResultModal = forwardRef(function ResultModal(
    { onHome, onReplay, result },
    ref
) {
    const { details } = useContext(DetailsContext);
    const { gameType } = useContext(GameContext);

    const winner = result === 'X' ? 'player-x' : 'player-o';
    let winnerValue;

    if (details.userSymbol === winner && gameType !== 'player to player') {
        winnerValue = 'You win';
    } else {
        winnerValue = winner === 'player-x' ? 'Player X wins' : 'Player O wins';
    }

    return (
        <Modal result={result} ref={ref}>
            <h2>{result === 'draw' ? 'Draw' : winnerValue}</h2>
            <div>
                <button onClick={onReplay}>Replay</button>
                <button onClick={onHome}>Home</button>
            </div>
        </Modal>
    );
});

export default ResultModal;
