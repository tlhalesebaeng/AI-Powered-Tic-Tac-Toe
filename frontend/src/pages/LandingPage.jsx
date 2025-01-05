import Form from '../components/Form';

export default function LandingPage() {
    function handleSubmitUsername(event) {
        event.preventDefault();
        console.log(event.current.value);
    }
    return <Form onSubmit={handleSubmitUsername} />;
}
