import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import TypesSelection from './TypesSelection.jsx';

describe('TypesSelection component', () => {
    // Mock useNavigate since it may be used only in the context of a <Router> component.
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
    }));

    it('renders a heading', async () => {
        render(<TypesSelection />);
        const heading = await screen.queryByRole('heading', { level: 2 });
        expect(heading).not.toBeNull();
    });
});
