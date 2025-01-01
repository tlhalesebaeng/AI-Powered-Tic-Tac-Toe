import "./LandingPage.css";

export default function LandingPage() {
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
            <button className="transparent X">X</button>
            <button className="selected-player O">0</button>
          </div>
          <p>Player X goes first</p>
          {/*render this when the game type is only player to player */}
        </div>
        <div className="game-type column">
          <button className="player-x-color">Online Multiplayer</button>
          <button className="draw-color">Single player(vs AI)</button>
          <button className="player-o-color">Player to Player</button>
        </div>
      </div>
    </main>
  );
}
