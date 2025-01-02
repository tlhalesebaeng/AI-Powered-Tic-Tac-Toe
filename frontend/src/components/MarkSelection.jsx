import './MarkSelection.css';

export default function MarkSelection({ selectedMark, onSelectMark }) {
    return (
        <div className="mark-selection-container column">
            <h2>Select player 1's mark</h2>
            <div className="selection-container row">
                <button
                    onClick={() => onSelectMark('player-x')}
                    className={`${
                        selectedMark !== 'player-x'
                            ? 'not-selected-mark'
                            : 'selected-mark'
                    }  X`}
                >
                    X
                </button>
                <button
                    onClick={() => onSelectMark('player-o')}
                    className={`${
                        selectedMark !== 'player-o'
                            ? 'not-selected-mark'
                            : 'selected-mark'
                    }  O`}
                >
                    0
                </button>
            </div>
            <p>Player X goes first</p>
        </div>
    );
}
