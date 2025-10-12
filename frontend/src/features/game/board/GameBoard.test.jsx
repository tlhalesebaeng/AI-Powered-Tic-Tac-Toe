import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import GameBoard from './GameBoard.jsx';

describe('GameBoard component', () => {
    let GAME_BOARD;
    beforeEach(() => {
        GAME_BOARD = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    });

    it('renders an unorder list tag as a wrapper', () => {
        const { container } = render(<GameBoard board={GAME_BOARD} />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('UL');
    });

    it('renders twelve list items', async () => {
        render(<GameBoard board={GAME_BOARD} />);
        const items = await screen.queryAllByRole('listitem');
        expect(items).toHaveLength(12);
    });

    it('renders nine buttons', async () => {
        render(<GameBoard board={GAME_BOARD} />);
        const buttons = await screen.queryAllByRole('button');
        expect(buttons).toHaveLength(9);
    });
});
