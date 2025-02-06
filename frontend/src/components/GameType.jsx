import { useContext } from 'react';
import { GameContext } from '../store/game-context.jsx';

import './GameType.css';

export default function GameType({ onSelectGameType }) {
    const { gameType } = useContext(GameContext);

    return (
        <div className="game-type column">
            <button
                onClick={() => onSelectGameType('online multiplayer')}
                className={`btn-select-game-type player-x-color ${
                    gameType === 'online multiplayer'
                        ? 'selected-game-type'
                        : null
                }`}
            >
                Online Multiplayer
            </button>
            <button
                onClick={() => onSelectGameType('single player')}
                className={`btn-select-game-type draw-color ${
                    gameType === 'single player' ? 'selected-game-type' : null
                }`}
            >
                Single Player (AI Mode)
            </button>
            <button
                onClick={() => onSelectGameType('player to player')}
                className={`btn-select-game-type player-o-color ${
                    gameType === 'player to player'
                        ? 'selected-game-type'
                        : null
                }`}
            >
                Local Multiplayer
            </button>
        </div>
    );
}
