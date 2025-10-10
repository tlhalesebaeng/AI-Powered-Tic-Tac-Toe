import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import GameType from './GameType';

describe('GameType component', () => {
    it('renders 3 buttons', async () => {
        render(<GameType />);
        const buttons = await screen.queryAllByRole('button');
        expect(buttons).toHaveLength(3);
    });

    it('renders the "Online Multiplayer" button', async () => {
        render(<GameType />);
        const button = await screen.queryByRole('button', {
            name: /online multiplayer/i,
        });
        expect(button).not.toBeNull();
    });

    it('renders the "Single Player" button', async () => {
        render(<GameType />);
        const button = await screen.queryByRole('button', {
            name: /single player/i,
        });
        expect(button).not.toBeNull();
    });

    it('renders the "Local Multiplayer" button', async () => {
        render(<GameType />);
        const button = await screen.queryByRole('button', {
            name: /local multiplayer/i,
        });
        expect(button).not.toBeNull();
    });
});
