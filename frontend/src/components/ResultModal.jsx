import { forwardRef, useContext } from 'react';
import './ResultModal.css';
import Modal from './Modal';
import { GameContext } from '../store/game-context';

const ResultModal = forwardRef(function ResultModal(
    { onHome, onReplay, result },
    ref
) {
    const { userDetails } = useContext(GameContext);
    const winner = result === 'X' ? 'player-x' : 'player-o';

    let winnerValue;
    if (userDetails.symbol === winner) {
        winnerValue = 'You win';
    } else {
        winnerValue = winner === 'player-x' ? 'Player X wins' : 'Player O wins';
    }

    const details = {
        gameType: 'game page',
        result,
    };
    return (
        <Modal details={details} ref={ref}>
            <h2>{result === 'draw' ? 'Draw' : winnerValue}</h2>
            <div>
                <button onClick={onReplay}>Replay</button>
                <button onClick={onHome}>Home</button>
            </div>
        </Modal>
    );
});

export default ResultModal;
