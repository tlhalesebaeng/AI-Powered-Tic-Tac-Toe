import './History.css';

export default function GameHistory({ history = {} }) {
    return (
        <ul className="game-history">
            <li className="player-x-color">
                <h2>Player X</h2>
                <p>{history.X || 0}</p>
            </li>
            <li className="draw-color">
                <h2>Draw</h2>
                <p>{history.draw || 0}</p>
            </li>
            <li className="player-o-color">
                <h2>Player O</h2>
                <p>{history.O || 0}</p>
            </li>
        </ul>
    );
}
