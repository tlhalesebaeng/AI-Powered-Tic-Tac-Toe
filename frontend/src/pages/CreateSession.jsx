import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';
import SessionModal from '../components/SessionModal';

export default function CreateSession() {
    const opponentUsernameRef = useRef();
    const dialogRef = useRef();
    const navigate = useNavigate();

    function handleSubmitOpponentUsername(event) {
        event.preventDefault();
        const opponentUsername = opponentUsernameRef.current.value;
        if (opponentUsername === '') {
            //add a flashing animation of the heading
        } else {
            dialogRef.current.open();
            //navigate('/game');
        }
    }

    function handleRetry() {
        dialogRef.current.close();
    }

    function handleCancel() {
        dialogRef.current.close();
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
