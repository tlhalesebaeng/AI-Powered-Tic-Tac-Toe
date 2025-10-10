import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import CreateUsername from './CreateUsername.jsx';

describe('CreateUsername component', () => {
    // Mock useNavigate since it may be used only in the context of a <Router> component.
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
    }));

    it('renders a form element', async () => {
        const { container } = render(<CreateUsername />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('FORM');
    });
});
