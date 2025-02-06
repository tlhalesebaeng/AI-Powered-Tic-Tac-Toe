import { useNavigate } from 'react-router-dom';

export default function DifficultySelection() {
    const navigate = useNavigate();

    function handleDifficulty(difficulty) {
        navigate(`/type/ai/${difficulty}`);
    }
    return (
        <div className="container column">
            <button
                onClick={() => handleDifficulty('easy')}
                className={'btn-select-game-type player-x-color'}
            >
                Easy
            </button>
            <button
                onClick={() => handleDifficulty('hard')}
                className={'btn-select-game-type player-o-color'}
            >
                Hard
            </button>
        </div>
    );
}
