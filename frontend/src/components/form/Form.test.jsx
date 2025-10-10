import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Form from './Form.jsx';

describe('Form component', () => {
    // Mock useNavigate since it may be used only in the context of a <Router> component.
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
    }));

    it('renders a form tag as a wrapper', () => {
        const { container } = render(<Form />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('FORM');
    });

    it('renders an h2 title prop', async () => {
        render(<Form title="test title" />);
        const title = await screen.queryByRole('heading', {
            name: 'test title',
            level: 2,
        });
        expect(title).not.toBeNull();
    });

    it('renders an input field', async () => {
        render(<Form />);
        const input = await screen.queryByPlaceholderText(/your username/i);
        expect(input).not.toBeNull();
    });

    it('renders a "Continue" button', async () => {
        render(<Form />);
        const btn = await screen.queryByRole('button', { name: 'Continue' });
        expect(btn).not.toBeNull();
    });
});
