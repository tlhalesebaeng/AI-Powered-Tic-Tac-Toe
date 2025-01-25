import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import MarkSelection from '../components/MarkSelection.jsx';
import GameType from '../components/GameType';
import './TypesSelection.css';
import socket from '../../socket';
import { GameContext } from '../store/game-context.jsx';

const DETAILS = {
    selectedMark: 'player-x',
    selectedGameType: '',
};

export default function TypesSelection() {
    const [selectedDetails, setSelectedDetails] = useState(DETAILS);
    const navigate = useNavigate();
    const { setUserDetails, setGameType } = useContext(GameContext);

    const { selectedMark, selectedGameType } = selectedDetails;

    function handleGameType(gameType) {
        setSelectedDetails((prevState) => ({
            ...prevState,
            selectedGameType: gameType,
        }));
        setGameType(gameType);
        if (gameType === 'online multiplayer') {
            navigate('/type/online');
        } else if (gameType === 'player to player') {
            navigate('/game');
        }
    }

    function handleSelectedMark(player) {
        setUserDetails((prevDetails) => {
            return { ...prevDetails, symbol: player };
        });
        setSelectedDetails((prevDetails) => {
            return {
                ...prevDetails,
                selectedMark: player,
            };
        });
    }

    return (
        <div className="container column">
            <h2 className="marks-heading">
                <span className="X">X</span>
                <span className="O">O</span>
            </h2>
            <MarkSelection
                selectedMark={selectedMark}
                onSelectMark={handleSelectedMark}
            />
            <GameType
                selectedGameType={selectedGameType}
                onSelectGameType={handleGameType}
            />
        </div>
    );
}
