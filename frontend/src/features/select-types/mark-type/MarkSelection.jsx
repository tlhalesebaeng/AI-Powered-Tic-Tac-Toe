import { useContext } from 'react';
import { DetailsContext } from '../../../store/details-context';
import './MarkSelection.css';

export default function MarkSelection({ onSelectMark }) {
    const { details } = useContext(DetailsContext);

    return (
        <div className="mark-selection-container column">
            <h3>Select player 1's mark</h3>
            <div className="selection-container row">
                <button
                    onClick={() => onSelectMark('player-x')}
                    className={`${
                        details.userSymbol === 'player-x'
                            ? 'selected-mark'
                            : 'not-selected-mark'
                    }  X`}
                >
                    X
                </button>
                <button
                    onClick={() => onSelectMark('player-o')}
                    className={`${
                        details.userSymbol === 'player-o'
                            ? 'selected-mark'
                            : 'not-selected-mark'
                    }  O`}
                >
                    0
                </button>
            </div>
            <p>Player X goes first</p>
        </div>
    );
}
