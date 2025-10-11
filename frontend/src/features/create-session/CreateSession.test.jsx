import { afterEach, beforeEach, describe, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import CreateSession from './CreateSession.jsx';

describe('CreateSession component', () => {
    // Mock useNavigate since it may be used only in the context of a <Router> component.
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
    }));

    // To avoid the "Target container is not a DOM element." error that
    // createPortal throws when it cannot find the element
    // Add the div that it looks for in the DOM before each test
    beforeEach(() => {
        const portalHook = document.createElement('div');
        portalHook.setAttribute('id', 'modal');
        document.body.appendChild(portalHook);
    });

    // After each test, remove the div that we added
    afterEach(() => {
        const portalHook = document.getElementById('modal');
        if (portalHook) portalHook.remove();
    });

    it('renders a form as a wrapper', () => {
        const { container } = render(<CreateSession />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('FORM');
    });
});
