import { prettyDOM, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GameHistory from './History.jsx';

describe('History', () => {
    it('renders a list as a wrapper', () => {
        const { container } = render(<GameHistory />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('UL');
    });

    it('renders three list items', async () => {
        render(<GameHistory />);
        const items = await screen.queryAllByRole('listitem');
        expect(items).toHaveLength(3);
    });

    it('renders three h2 headings', async () => {
        render(<GameHistory />);
        const headings = await screen.queryAllByRole('heading', { level: 2 });
        expect(headings).toHaveLength(3);
    });

    it('renders a "Player X" h2 heading', async () => {
        render(<GameHistory />);
        const headings = await screen.queryByRole('heading', {
            name: 'Player X',
            level: 2,
        });
        expect(headings).not.toBeNull();
    });

    it('renders a "Draw" h2 heading', async () => {
        render(<GameHistory history={history} />);
        const headings = await screen.queryByRole('heading', {
            name: 'Draw',
            level: 2,
        });
        expect(headings).not.toBeNull();
    });

    it('renders a "Player O" h2 heading', async () => {
        render(<GameHistory />);
        const headings = await screen.queryByRole('heading', {
            name: 'Player O',
            level: 2,
        });
        expect(headings).not.toBeNull();
    });

    it('renders three paragraphs', async () => {
        render(<GameHistory />);
        const paragraphs = await screen.queryAllByRole('paragraph');
        expect(paragraphs).toHaveLength(3);
    });

    it('renders correct player X score history in a paragraph tag', async () => {
        const rand = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        const history = { X: rand };
        render(<GameHistory history={history} />);
        const paragraph = await screen.queryByText(rand);
        expect(paragraph).not.toBeNull();
    });

    it('renders correct draw score history in a paragraph tag', async () => {
        const rand = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        const history = { draw: rand };
        render(<GameHistory history={history} />);
        const paragraph = await screen.queryByText(rand);
        expect(paragraph).not.toBeNull();
    });

    it('renders correct player O score history in a paragraph tag', async () => {
        const rand = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        const history = { O: rand };
        render(<GameHistory history={history} />);
        const paragraph = await screen.queryByText(rand);
        expect(paragraph).not.toBeNull();
    });
});
