import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage.jsx';

describe('Error component', () => {
    it('renders main tag as a wrapper', () => {
        const { container } = render(<ErrorPage />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('MAIN');
    });

    it('renders "An Error Has Occurred" inside h2 tag', async () => {
        render(<ErrorPage />);
        const heading = await screen.getByRole('heading', {
            level: 2,
            name: 'An Error Has Occurred',
        });
        expect(heading).not.toBeNull();
    });
});
