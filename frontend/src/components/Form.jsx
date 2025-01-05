import './Form.css';

export default function Form({ onSubmit }) {
    return (
        <form className="container column">
            <h2>Create a temporary username</h2>
            <input />
            <button onClick={onSubmit} className="player-o-color">
                Continue
            </button>
        </form>
    );
}
