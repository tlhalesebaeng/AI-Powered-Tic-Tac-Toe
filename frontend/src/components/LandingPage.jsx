import { useState } from 'react';
import './LandingPage.css';

export default function LandingPage() {
    //put all this states into one object state
    const [selectedPlayer, setSelectedPlayer] = useState('player-x');
    const [selectedGameType, setSelectedGameType] = useState('');

    function handleGameType(gameType) {
        setSelectedGameType(gameType);
    }

    function handleSelectedPlayer(player) {
        setSelectedPlayer(player);
    }

    return (
        <main>
            <div className="container column">
                <h2 className="landing-page-heading">
                    <span className="X">X</span>
                    <span className="O">O</span>
                </h2>
                <div className="player-selection-container column">
                    <h2>Select player 1's mark</h2>
                    <div className="selection-container row">
                        <button
                            onClick={() => handleSelectedPlayer('player-x')}
                            className={`${
                                selectedPlayer !== 'player-x'
                                    ? 'transparent'
                                    : 'selected-player'
                            }  X`}
                        >
                            X
                        </button>
                        <button
                            onClick={() => handleSelectedPlayer('player-o')}
                            className={`${
                                selectedPlayer !== 'player-o'
                                    ? 'transparent'
                                    : 'selected-player'
                            }  O`}
                        >
                            0
                        </button>
                    </div>
                    <p>Player X goes first</p>
                    {/*render this when the game type is only player to player */}
                </div>
                <div className="game-type column">
                    <button
                        onClick={() => handleGameType('online multiplayer')}
                        className={`btn-select-game-type player-x-color ${
                            selectedGameType === 'online multiplayer'
                                ? 'selected-type'
                                : null
                        }`}
                    >
                        Online Multiplayer
                    </button>
                    <button
                        onClick={() => handleGameType('single player')}
                        className={`btn-select-game-type draw-color ${
                            selectedGameType === 'single player'
                                ? 'selected-type'
                                : null
                        }`}
                    >
                        Single player(vs AI)
                    </button>
                    <button
                        onClick={() => handleGameType('player to player')}
                        className={`btn-select-game-type player-o-color ${
                            selectedGameType === 'player to player'
                                ? 'selected-type'
                                : null
                        }`}
                    >
                        Player to Player
                    </button>
                </div>
            </div>
        </main>
    );
}
