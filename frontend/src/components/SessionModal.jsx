import { forwardRef, useState } from 'react';
import Modal from './Modal';
import './SessionModal.css';

const SessionModal = forwardRef(function SessionModal(
    { onRetry, onCancel },
    ref
) {
    const [title, setTitle] = useState('Looking for player...');
    const details = {
        gameType: 'online multiplayer',
        result: 'draw',
    };

    return (
        <Modal details={details} ref={ref}>
            <h2>{title}</h2>
            <div>
                <button onClick={onRetry}>Retry</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </Modal>
    );
});

export default SessionModal;
