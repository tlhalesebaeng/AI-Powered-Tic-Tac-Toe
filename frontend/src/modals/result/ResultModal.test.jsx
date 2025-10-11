import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ResultModal from './ResultModal.jsx';

describe('ResultModal component', () => {
    beforeEach(() => {
        // To avoid the "Target container is not a DOM element." error that
        // createPortal throws when it cannot find the element
        // Add the div that it looks for in the DOM before each test
        const portalHook = document.createElement('div');
        portalHook.setAttribute('id', 'modal');
        document.body.appendChild(portalHook);

        // To avoid the "showModal is not a function error" (which happens because vitest uses a DOM simulation
        // and does not implement the browser’s native dialog API methods) mock it
        // so that it adds the open attribute to the modal
        HTMLDialogElement.prototype.showModal = vi.fn(function () {
            this.setAttribute('open', ''); // The 'open' attribute needs no value
        });
    });

    // After each test, remove the div that we added
    afterEach(() => {
        const portalHook = document.getElementById('modal');
        if (portalHook) portalHook.remove();
    });

    it('renders an h2 heading of the game result', async () => {
        // Create a ref to access the methods exposed by the session modal component on refs
        const ref = createRef();

        // Render the component and link the ref
        render(<ResultModal result="X" ref={ref} />);

        // Open the modal using the ref and the method exposed by the component
        // so that its elements are discoverable by role based queries
        ref.current.open();

        const heading = await screen.findByRole('heading', {
            name: /player x wins/i,
            level: 2,
        }); // Use find query to wait for the elements to appear on the DOM
        expect(heading).not.toBeNull();
    });

    it('renders an h2 heading of "draw" when the game is draw', async () => {
        const ref = createRef();
        render(<ResultModal result="draw" ref={ref} />);
        ref.current.open();
        const heading = await screen.findByRole('heading', {
            name: /draw/i,
            level: 2,
        }); // Use find query to wait for the elements to appear on the DOM
        expect(heading).not.toBeNull();
    });

    it('renders two buttons', async () => {
        const ref = createRef();
        render(<ResultModal result="" ref={ref} />);
        ref.current.open();
        const buttons = await screen.queryAllByRole('button');
        expect(buttons).toHaveLength(2);
    });

    it('renders a "Replay" button', async () => {
        const ref = createRef();
        render(<ResultModal result="" ref={ref} />);
        ref.current.open();
        const buttons = await screen.queryByRole('button', {
            name: 'Replay',
        });
        expect(buttons).not.toBeNull();
    });

    it('renders a "Home" button', async () => {
        const ref = createRef();
        render(<ResultModal result="" ref={ref} />);
        ref.current.open();
        const buttons = await screen.queryByRole('button', {
            name: 'Home',
        });
        expect(buttons).not.toBeNull();
    });
});
