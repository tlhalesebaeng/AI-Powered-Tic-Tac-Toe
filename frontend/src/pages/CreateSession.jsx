import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';
import SessionModal from '../components/SessionModal';
import socket from '../../socket';

export default function CreateSession() {
    const opponentUsernameRef = useRef();
    const dialogRef = useRef();
    const navigate = useNavigate();

    const username = localStorage.getItem('username');

    useEffect(() => {
        socket.on('receive_join_room', (data) => {
            socket.emit('join_room', data);
            navigate(`/game/${data}`);
        });
    }, [socket]);

    let timeout;

    function handleSubmitOpponentUsername(event) {
        event.preventDefault();
        const opponentUsername =
            opponentUsernameRef.current.value.toLowerCase();
        if (opponentUsername === '') {
            //add a flashing animation of the heading
        } else {
            //dialogRef.current.open();
            // timeout = setTimeout(() => {
            //     navigate('/game');
            // }, 5000);
            //customize this alert
            //alert(`${username} wants to play`);

            //we need to validate if there is no current user who has this username, if not
            //join the room with the opponent username
            socket.emit('join_room', opponentUsername);
            navigate(`/game/${opponentUsername}`);
        }
    }

    function handleRetry() {
        dialogRef.current.close();
    }

    function handleCancel() {
        dialogRef.current.close();
        clearTimeout(timeout);
        navigate('/type');
    }

    return (
        <>
            <SessionModal
                onRetry={handleRetry}
                onCancel={handleCancel}
                ref={dialogRef}
            />
            <Form
                formType="opp username"
                ref={opponentUsernameRef}
                onSubmit={handleSubmitOpponentUsername}
            />
        </>
    );
}
