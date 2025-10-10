import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import MarkSelection from './MarkSelection.jsx';

describe('MarkSelection component', () => {
    it('renders an h3 title with any text', async () => {
        render(<MarkSelection />);
        const heading = await screen.queryByRole('heading', { level: 3 });
        expect(heading).not.toBeNull();
    });

    it('renders a button with a "X" mark', async () => {
        render(<MarkSelection />);
        const xMark = screen.queryByRole('button', { name: /x/i });
        expect(xMark).not.toBeNull();
    });

    it('renders a button with an "O" mark', async () => {
        render(<MarkSelection />);
        const xMark = screen.queryByRole('button', { name: /o/i });
        expect(xMark).not.toBeNull();
    });
});
