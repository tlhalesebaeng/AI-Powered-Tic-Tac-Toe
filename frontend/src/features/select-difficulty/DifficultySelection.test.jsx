import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DifficultySelection from './DifficultySelection.jsx';

describe('DifficultySelection component', () => {
    // Mock useNavigate since it may be used only in the context of a <Router> component.
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
    }));

    it('renders three buttons', async () => {
        render(<DifficultySelection />);
        const buttons = await screen.queryAllByRole('button');
        expect(buttons).toHaveLength(3);
    });

    it('renders an "Easy" button', async () => {
        render(<DifficultySelection />);
        const btn = await screen.queryByRole('button', { name: 'Easy' });
        expect(btn).not.toBeNull();
    });

    it('renders a "Normal" button', async () => {
        render(<DifficultySelection />);
        const btn = await screen.queryByRole('button', { name: 'Normal' });
        expect(btn).not.toBeNull();
    });

    it('renders a "Hard" button', async () => {
        render(<DifficultySelection />);
        const btn = await screen.queryByRole('button', { name: 'Hard' });
        expect(btn).not.toBeNull();
    });
});
