import { forwardRef } from 'react';
import './ResultModal.css';
import Modal from './Modal';

const ResultModal = forwardRef(function ResultModal(
    { onHome, onReplay, result },
    ref
) {
    const details = {
        gameType: 'game page',
        result,
    };
    return (
        <Modal details={details} ref={ref}>
            <h2>{result === 'draw' ? 'Draw' : `Player ${result} wins`}</h2>
            <div>
                <button onClick={onReplay}>Replay</button>
                <button onClick={onHome}>Home</button>
            </div>
        </Modal>
    );
});

export default ResultModal;
