import { forwardRef, useEffect, useState } from 'react';
import Modal from './Modal';
import './SessionModal.css';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';

const SessionModal = forwardRef(function SessionModal({ modalDetails }, ref) {
    const navigate = useNavigate();

    const { onRetry, onCancel, onAccept, heading, modalType } = modalDetails;

    useEffect(() => {
        socket.on('receive_join_room_error', () => {
            console.log('oops user is not there');
        });
    }, [socket]);

    const details = {
        gameType: 'online multiplayer',
        result: 'draw',
    };

    //<button onClick={onRetry}>Retry</button>

    return (
        <Modal details={details} ref={ref}>
            <h2>{heading}</h2>
            <div>
                {modalType !== 'awaiting-confirmation' && (
                    <button onClick={onAccept}>Accept</button>
                )}

                <button onClick={onCancel}>Cancel</button>
            </div>
        </Modal>
    );
});

export default SessionModal;
