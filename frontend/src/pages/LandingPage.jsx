import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MarkSelection from '../components/MarkSelection.jsx';
import GameType from '../components/GameType';
import './LandingPage.css';

const DETAILS = {
    selectedMark: 'player-x',
    selectedGameType: '',
};

export default function LandingPage() {
    const [selectedDetails, setSelectedDetails] = useState(DETAILS);
    const navigate = useNavigate();

    const { selectedMark, selectedGameType } = selectedDetails;

    function handleGameType(gameType) {
        setSelectedDetails((prevState) => ({
            ...prevState,
            selectedGameType: gameType,
        }));
        navigate('/game');
    }

    function handleSelectedMark(player) {
        setSelectedDetails((prevState) => ({
            ...prevState,
            selectedMark: player,
        }));
    }

    return (
        <div className="container column">
            <h2 className="landing-page-heading">
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
