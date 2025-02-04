import { useRef } from 'react';

import Form from '../components/Form';

export default function LandingPage() {
    const usernameRef = useRef(); //refers to the username input

    function handleSubmitUsername(event) {
        usernameRef.current.submitUsername(event); //submit the username
    }
    return (
        <Form
            onSubmit={handleSubmitUsername}
            title="Create a temporary username"
            ref={usernameRef}
            renderUsername={false}
        />
    );
}
