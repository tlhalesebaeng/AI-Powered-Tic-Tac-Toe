import { useContext } from 'react';
import './PlayerTurn.css';
import { GameContext } from '../store/game-context';
import { DetailsContext } from '../store/details-context';

export default function PlayerTurn({ turn }) {
    const { gameType } = useContext(GameContext);
    const { details } = useContext(DetailsContext);

    let turnValue = turn === 'player-x' ? "X's" : "O's";
    if (gameType === 'online multiplayer') {
        if (details.userSymbol === turn) {
            turnValue = 'Your';
        }
    }

    return (
        <div
            className={`player-turn-container ${
                turn === 'player-x' ? 'player-x-color' : 'player-o-color'
            }`}
        >
            <p>{turnValue} turn</p>
        </div>
    );
}
