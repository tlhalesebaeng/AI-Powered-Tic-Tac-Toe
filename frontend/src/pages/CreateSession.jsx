import { useEffect, useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';
import SessionModal from '../components/SessionModal';
import socket from '../../socket';
import { GameContext } from '../store/game-context';

export default function CreateSession() {
    const [modalType, setModalType] = useState('awaiting-confirmation');
    const opponentUsernameRef = useRef();
    const dialogRef = useRef();
    const navigate = useNavigate();

    const { userDetails, opponentDetails, setUserDetails, setOpponentDetails } =
        useContext(GameContext);
    const username = userDetails.name;
    if (!username) {
        //username is not defined here
        //do something
    }

    useEffect(() => {
        socket.on('receive_join_room', (data) => {
            //Here the opponentUsername is the value of userDetails.name
            const { username, mySymbol, opponentSymbol } = data;

            setUserDetails((prevState) => {
                return { ...prevState, symbol: opponentSymbol };
            });

            setOpponentDetails({ name: username, symbol: mySymbol });

            //socket.emit('join_room', data);
            navigate(`/game/${username}`);
        });

        socket.on('receive_join_room_request', (data) => {
            //This users username is the opponentUsername here
            const { requester, yourSymbol, requesterSymbol } = data;

            //The symbol here is the symbol of the user that requested a game
            setOpponentDetails({ name: requester, symbol: requesterSymbol });
            setUserDetails((prevDetails) => {
                return { ...prevDetails, symbol: yourSymbol };
            });

            dialogRef.current.open();
            setModalType('game-request');
        });
    }, [socket]);

    let timeout;
    let opponentUsername;

    function handleSubmitOpponentUsername(event) {
        event.preventDefault();
        opponentUsername = opponentUsernameRef.current.value
            .trim()
            .toLowerCase();
        if (opponentUsername === '') {
            //add a flashing animation of the heading
        } else {
            const opponentSymbol =
                userDetails.symbol === 'player-x' ? 'player-o' : 'player-x';

            //request the opponent to join the room
            socket.emit('join_room', {
                requester: username,
                requesterSymbol: userDetails.symbol,
                yourSymbol: opponentSymbol,
                opponentUsername,
            });

            setOpponentDetails(() => {
                return { name: opponentUsername, symbol: opponentSymbol };
            });

            dialogRef.current.open();
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

    function handleAccept() {
        dialogRef.current.close();

        //accept the join room request
        socket.emit('join_room_accept', {
            username,
            mySymbol: userDetails.symbol,
            opponentUsername: opponentDetails.name,
            opponentSymbol: opponentDetails.symbol,
        });
        navigate(`/game/${username}`);
    }

    //convert the first letter of the opponents name to a capital letter
    // if (opponentDetails.name) {
    //     const nameSplitted = opponentDetails.name.split('');
    //     let tempName = '';
    //     for (const i = 0; i < nameSplitted.length; i++) {
    //         if (i === 0) {
    //             tempName += nameSplitted[i].toUpperCase();
    //         } else {
    //             tempName += nameSplitted[i];
    //         }
    //     }
    // }

    const heading =
        modalType === 'awaiting-confirmation'
            ? 'Loading...'
            : `${opponentDetails.name} wants to play`;

    const modalDetails = {
        onRetry: handleRetry,
        onCancel: handleCancel,
        onAccept: handleAccept,
        heading,
        modalType,
    };

    return (
        <>
            <SessionModal ref={dialogRef} modalDetails={modalDetails} />
            <Form
                formType="opp username"
                ref={opponentUsernameRef}
                onSubmit={handleSubmitOpponentUsername}
            />
        </>
    );
}
