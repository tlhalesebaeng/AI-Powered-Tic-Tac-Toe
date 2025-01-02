import './History.css';

export default function GameHistory() {
    return (
        <ul className="game-history">
            <li className="player-x-color">
                <h2>Player X</h2>
                <p>{0}</p>
            </li>
            <li className="draw-color">
                <h2>Draw</h2>
                <p>{0}</p>
            </li>
            <li className="player-o-color">
                <h2>Player O</h2>
                <p>{0}</p>
            </li>
        </ul>
    );
}
