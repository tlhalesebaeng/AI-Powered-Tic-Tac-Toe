import { useContext } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameContextProvider, { GameContext } from './game-context.jsx';
import userEvent from '@testing-library/user-event';

const ContextTester = () => {
    const { gameType, setGameType } = useContext(GameContext);
    return (
        <>
            <h2>{gameType}</h2>
            <button onClick={() => setGameType('test-game-type')}>
                Set Game Type
            </button>
        </>
    );
};

describe('Game Context', () => {
    it('contains correct initial game type', async () => {
        render(
            <GameContextProvider>
                <ContextTester />
            </GameContextProvider>
        );

        const gameType = await screen.queryByText('test-game-type');
        expect(gameType).toBeNull();
    });

    it('updates the game type correctly', async () => {
        render(
            <GameContextProvider>
                <ContextTester />
            </GameContextProvider>
        );

        const setGameTypeBtn = await screen.queryByText('Set Game Type');
        await userEvent.click(setGameTypeBtn);

        const gameType = await screen.queryByText('test-game-type');
        expect(gameType).not.toBeNull();
    });
});
