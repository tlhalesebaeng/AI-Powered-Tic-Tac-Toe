import { useRef } from 'react';

import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';

export default function LandingPage() {
    const usernameRef = useRef();
    const navigate = useNavigate();

    function handleSubmitUsername(event) {
        event.preventDefault();
        const username = usernameRef.current.value;
        if (username === '') {
            //add a flashing animation of the heading
        } else {
            socket.emit('register', username.toLowerCase());
            localStorage.setItem('username', username);
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
