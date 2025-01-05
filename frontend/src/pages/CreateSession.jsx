import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';

export default function CreateSession() {
    const opponentUsernameRef = useRef();
    const navigate = useNavigate();

    function handleSubmitOpponentUsername(event) {
        event.preventDefault();
        const opponentUsername = opponentUsernameRef.current.value;
        if (opponentUsername === '') {
            //add a flashing animation of the heading
        } else {
            navigate('/game');
        }
    }

    return (
        <Form
            formType="opp username"
            ref={opponentUsernameRef}
            onSubmit={handleSubmitOpponentUsername}
        />
    );
}
