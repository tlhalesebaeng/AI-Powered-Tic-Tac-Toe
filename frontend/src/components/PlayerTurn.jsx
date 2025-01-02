import './PlayerTurn.css';

export default function PlayerTurn({ turn }) {
    return (
        <div
            className={`player-turn-container ${
                turn === 'player x' ? 'player-x-color' : 'player-o-color'
            }`}
        >
            <p>{turn === 'player x' ? 'X' : 'O'} turn</p>
        </div>
    );
}
