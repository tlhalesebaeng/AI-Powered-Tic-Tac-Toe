import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameContext } from '../../store/game-context.jsx';
import { DetailsContext } from '../../store/details-context.jsx';

import MarkSelection from './MarkSelection.jsx';
import GameType from './GameType.jsx';
import './TypesSelection.css';

export default function TypesSelection() {
    const navigate = useNavigate();
    const { setGameType } = useContext(GameContext);
    const { details, addUser, addOpponent } = useContext(DetailsContext);

    function handleGameType(gameType) {
        setGameType(gameType);
        if (gameType === 'online multiplayer') {
            navigate('/type/online');
        } else if (gameType === 'player to player') {
            navigate('/game');
        } else if (gameType === 'single player') {
            const aiSymbol =
                details.userSymbol === 'player-x' ? 'player-o' : 'player-x';
            addOpponent('AI', aiSymbol);
            navigate('/type/ai');
        }
    }

    function handleSelectedMark(player) {
        addUser(details.name, player);
    }

    return (
        <div className="container column">
            <h2 className="marks-heading">
                <span className="X">X</span>
                <span className="O">O</span>
            </h2>
            <MarkSelection onSelectMark={handleSelectedMark} />
            <GameType onSelectGameType={handleGameType} />
        </div>
    );
}
