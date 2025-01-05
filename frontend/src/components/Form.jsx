import { forwardRef } from 'react';
import './Form.css';

const Form = forwardRef(function Form({ onSubmit, formType }, ref) {
    const username = localStorage.getItem('username');

    return (
        <form className="container column">
            <h2>
                {formType === 'opp username'
                    ? 'Write opponent username'
                    : 'Create a temporary username'}
            </h2>
            <input ref={ref} />
            {formType === 'opp username' && (
                <p>{`Your username: ${username}`}</p>
            )}
            <button onClick={() => onSubmit(event)} className="player-o-color">
                Continue
            </button>
        </form>
    );
});

export default Form;
