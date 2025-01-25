import { useContext } from 'react';
import './PlayerTurn.css';
import { GameContext } from '../store/game-context';

export default function PlayerTurn({ turn }) {
    const { userDetails, gameType } = useContext(GameContext);
    let turnValue = turn === 'player-x' ? "X's" : "O's";
    if (gameType === 'online multiplayer') {
        if (userDetails.symbol === turn) {
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
