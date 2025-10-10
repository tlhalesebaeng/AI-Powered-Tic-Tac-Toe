import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import './Form.css';
import { DetailsContext } from '../../store/details-context';
import { useNavigate } from 'react-router-dom';
import socket from '../../../socket';

const Form = forwardRef(function Form(
    { onSubmit, title, renderUsername },
    ref
) {
    const { details, addUser, addOpponent } = useContext(DetailsContext);
    const usernameRef = useRef(); //refers to the username input
    const navigate = useNavigate();

    //expose the component functions to other components
    useImperativeHandle(ref, () => {
        return {
            //submit the username
            submitUsername(event) {
                event.preventDefault(); //prevent app reload
                const username = usernameRef.current.value.trim().toLowerCase();
                if (username) {
                    //emit the register event to add the user to a list of connected users
                    socket.emit('register', username);

                    //set the user details and their default symbol
                    addUser(username, 'player-x');

                    //navigate to the /type route
                    navigate('/type');
                }
            },
            //submit the opponent username
            submitOpponentUsername(event) {
                event.preventDefault();
                const opponentUsername = usernameRef.current.value
                    .trim()
                    .toLowerCase();
                if (opponentUsername) {
                    const opponentSymbol =
                        details.userSymbol === 'player-x'
                            ? 'player-o'
                            : 'player-x';

                    //request the opponent to join the room
                    socket.emit('join_room', {
                        requester: details.username,
                        requesterSymbol: details.userSymbol,
                        yourSymbol: opponentSymbol,
                        opponentUsername,
                    });

                    //set this after the opponent has been found successfully
                    addOpponent(opponentUsername, opponentSymbol);
                }
            },
        };
    });

    return (
        <form className="container column">
            <h2>{title}</h2>
            <input type="text" placeholder="Your username" ref={usernameRef} />
            {renderUsername && <p>{`Your username: ${details.username}`}</p>}
            <button onClick={onSubmit} className="player-o-color">
                Continue
            </button>
        </form>
    );
});

export default Form;
