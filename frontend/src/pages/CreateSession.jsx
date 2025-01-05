import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';
import SessionModal from '../components/SessionModal';

export default function CreateSession() {
    const opponentUsernameRef = useRef();
    const dialogRef = useRef();
    const navigate = useNavigate();
    let timeout;

    function handleSubmitOpponentUsername(event) {
        event.preventDefault();
        const opponentUsername = opponentUsernameRef.current.value;
        if (opponentUsername === '') {
            //add a flashing animation of the heading
        } else {
            dialogRef.current.open();
            timeout = setTimeout(() => {
                navigate('/game');
            }, 5000);
            //navigate('/game');
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
