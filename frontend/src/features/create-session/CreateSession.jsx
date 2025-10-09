import { useEffect, useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../../components/form/Form';
import SessionModal from '../../modals/session/SessionModal';
import socket from '../../../socket';
import { DetailsContext } from '../../store/details-context';

export default function CreateSession() {
    const [modalType, setModalType] = useState('awaiting-confirmation');
    const opponentUsernameRef = useRef();
    const dialogRef = useRef();
    const navigate = useNavigate();
    const { details, addOpponent, addUser } = useContext(DetailsContext);

    let heading;
    const username = details.username;

    if (!username) {
        //username is not defined here
        //do something
    }

    useEffect(() => {
        socket.on('receive_join_room', (data) => {
            //Here the opponentUsername is the value of userDetails.name
            const { username, mySymbol, opponentSymbol } = data;

            addUser(details.username, opponentSymbol);
            addOpponent(username, mySymbol);

            navigate(`/game/${username}`);
        });

        socket.on('receive_join_room_request', (data) => {
            //This users username is the opponentUsername here
            const { requester, yourSymbol, requesterSymbol } = data;

            //The symbol here is the symbol of the user that requested a game
            addOpponent(requester, requesterSymbol);
            addUser(details.username, yourSymbol);

            setModalType('game-request');

            dialogRef.current.open();
        });

        socket.on('receive_join_room_error', (data) => {
            const { opponentUsername } = data;
            const heading = `${opponentUsername} does not exist!`;
            console.log(heading);
            //dialog.current.open();
        });
    }, [socket]);

    function handleSubmitOpponentUsername(event) {
        opponentUsernameRef.current.submitOpponentUsername(event);
        dialogRef.current.open();
    }

    function handleRetry() {
        dialogRef.current.close();
    }

    function handleCancel() {
        dialogRef.current.close();
        navigate('/type');
    }

    function handleAccept() {
        dialogRef.current.close();

        //accept the join room request
        socket.emit('join_room_accept', {
            username,
            mySymbol: details.userSymbol,
            opponentUsername: details.opponentUsername,
            opponentSymbol: details.opponentSymbol,
        });
        navigate(`/game/${username}`);
    }

    heading =
        modalType === 'awaiting-confirmation'
            ? 'Loading...'
            : `${details.opponentUsername} wants to play`;

    const modalDetails = {
        onRetry: handleRetry,
        onCancel: handleCancel,
        onAccept: handleAccept,
        heading,
        modalType,
    };

    return (
        <>
            <SessionModal ref={dialogRef} {...modalDetails} />
            <Form
                title="Write opponent username"
                ref={opponentUsernameRef}
                onSubmit={handleSubmitOpponentUsername}
                renderUsername={true}
            />
        </>
    );
}
