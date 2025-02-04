import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkSelection from '../components/MarkSelection.jsx';
import GameType from '../components/GameType';
import './TypesSelection.css';
import { GameContext } from '../store/game-context.jsx';
import { DetailsContext } from '../store/details-context.jsx';

export default function TypesSelection() {
    const navigate = useNavigate();
    const { setGameType } = useContext(GameContext);
    const { details, addUser } = useContext(DetailsContext);

    function handleGameType(gameType) {
        setGameType(gameType);
        if (gameType === 'online multiplayer') {
            navigate('/type/online');
        } else if (gameType === 'player to player') {
            navigate('/game');
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
