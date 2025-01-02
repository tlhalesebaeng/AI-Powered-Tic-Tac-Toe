import { useState } from 'react';
import MarkSelection from './MarkSelection.jsx';
import './LandingPage.css';
import GameType from './GameType.jsx';

const DETAILS = {
    selectedMark: 'player-x',
    selectedGameType: '',
};

export default function LandingPage() {
    const [selectedDetails, setSelectedDetails] = useState(DETAILS);

    const { selectedMark, selectedGameType } = selectedDetails;

    function handleGameType(gameType) {
        setSelectedDetails((prevState) => ({
            ...prevState,
            selectedGameType: gameType,
        }));
    }

    function handleSelectedMark(player) {
        setSelectedDetails((prevState) => ({
            ...prevState,
            selectedMark: player,
        }));
    }

    return (
        <main>
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
        </main>
    );
}
