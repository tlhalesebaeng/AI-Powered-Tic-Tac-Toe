import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import PlayerTurn from './PlayerTurn.jsx';
import GameContextProvider, {
    GameContext,
} from '../../../store/game-context.jsx';
import DetailsContextProvider, {
    DetailsContext,
} from '../../../store/details-context.jsx';

const customRender = (component, gameProviderProps, detailsProviderProps) => {
    return render(
        <GameContext.Provider value={gameProviderProps}>
            <DetailsContext.Provider value={detailsProviderProps}>
                {component}
            </DetailsContext.Provider>
        </GameContext.Provider>
    );
};

describe('PlayerTurn component', () => {
    let gameProviderProps;
    let detailsProviderProps;
    beforeEach(() => {
        // In terms of the game context the PlayerTurn component only uses game type property, so we only set it
        gameProviderProps = {
            gameType: '',
            setGameType: vi.fn((type) => {
                gameProviderProps.gameType = type;
            }),
        };

        // In terms of the details context the PlayerTurn component only uses the user symbol, so we only set it
        detailsProviderProps = {
            details: { userSymbol: '' },
            addUser: vi.fn(),
            addOpponent: vi.fn(),
        };
    });

    it('renders a paragraph', async () => {
        render(<PlayerTurn turn={{}} />);
        const paragraph = await screen.queryByRole('paragraph');
        expect(paragraph).not.toBeNull();
    });

    it('renders one paragraph', async () => {
        render(<PlayerTurn turn={{}} />);
        const paragraphs = await screen.queryAllByRole('paragraph');
        expect(paragraphs).toHaveLength(1);
    });

    it('renders correct player turn', async () => {
        const turns = ['player-x', 'player-o'];
        const randomTurn = turns[Math.floor(Math.random() * 1)];
        render(<PlayerTurn turn={randomTurn} />);
        const turn = await screen.queryByText(
            `${randomTurn === 'player-x' ? "X's" : "O's"} turn`
        );
        expect(turn).not.toBeNull();
    });

    it('renders correct player turn under default context values', async () => {
        const turns = ['player-x', 'player-o'];
        const randomTurn = turns[Math.floor(Math.random() * 1)];
        render(
            <GameContextProvider>
                <DetailsContextProvider>
                    <PlayerTurn turn={randomTurn} />
                </DetailsContextProvider>
            </GameContextProvider>
        );
        const turn = await screen.queryByText(
            `${randomTurn === 'player-x' ? "X's" : "O's"} turn`
        );
        expect(turn).not.toBeNull();
    });

    it('renders "Your turn" when the game is online multiplayer and the users symbol is similar to the current turn', async () => {
        // Pick a random turn
        const turns = ['player-x', 'player-o'];
        const randomTurn = turns[Math.floor(Math.random() * 1)];

        // Set the user symbol of the details to be the same as the random turn
        detailsProviderProps.details.userSymbol = randomTurn;

        // Set the game type to online multiplayer
        gameProviderProps.gameType = 'online multiplayer';
        customRender(
            <PlayerTurn turn={randomTurn} />,
            gameProviderProps,
            detailsProviderProps
        );

        // Assert the results
        const turn = await screen.queryByText('Your turn');
        expect(turn).not.toBeNull();
    });

    it('renders correct player turn when the game is online multiplayer and the users symbol NOT is similar to the current turn', async () => {
        // Pick a random turn
        const turns = ['player-x', 'player-o'];
        const randomInt = Math.floor(Math.random() * 1);
        const randomTurn = turns[randomInt];

        // Set the user symbol of the details to be the other turn symbol
        if (randomInt === 0) {
            detailsProviderProps.details.userSymbol = turns[1];
        } else {
            detailsProviderProps.details.userSymbol = turns[0];
        }

        // Set the game type to online multiplayer
        gameProviderProps.gameType = 'online multiplayer';
        customRender(
            <PlayerTurn turn={randomTurn} />,
            gameProviderProps,
            detailsProviderProps
        );

        // Assert the results
        const turn = await screen.queryByText('Your turn');
        expect(turn).toBeNull();
    });
});
