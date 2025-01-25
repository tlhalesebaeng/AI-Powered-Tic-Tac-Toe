import { useRef, useContext } from 'react';

import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';
import { GameContext } from '../store/game-context';

export default function LandingPage() {
    const usernameRef = useRef();
    const navigate = useNavigate();
    const { setUserDetails } = useContext(GameContext);

    function handleSubmitUsername(event) {
        event.preventDefault();
        const username = usernameRef.current.value.trim().toLowerCase();
        if (username === '') {
            //add a flashing animation of the heading
        } else {
            socket.emit('register', username);
            setUserDetails({ name: username, symbol: 'player-x' });
            navigate('/type');
        }
    }
    return (
        <Form
            formType="user username"
            ref={usernameRef}
            onSubmit={handleSubmitUsername}
        />
    );
}
