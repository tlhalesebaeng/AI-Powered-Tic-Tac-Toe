import './GameType.css';

export default function GameType({ selectedGameType, onSelectGameType }) {
    return (
        <div className="game-type column">
            {false && (
                <button
                    onClick={() => onSelectGameType('online multiplayer')}
                    className={`btn-select-game-type player-x-color ${
                        selectedGameType === 'online multiplayer'
                            ? 'selected-game-type'
                            : null
                    }`}
                >
                    Online Multiplayer
                </button>
            )}
            {false && (
                <button
                    onClick={() => onSelectGameType('single player')}
                    className={`btn-select-game-type draw-color ${
                        selectedGameType === 'single player'
                            ? 'selected-game-type'
                            : null
                    }`}
                >
                    Single player(vs AI)
                </button>
            )}
            <button
                onClick={() => onSelectGameType('player to player')}
                className={`btn-select-game-type player-o-color ${
                    selectedGameType === 'player to player'
                        ? 'selected-game-type'
                        : null
                }`}
            >
                Player to Player
            </button>
        </div>
    );
}
