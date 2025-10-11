import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Modal from './Modal.jsx';

describe('Modal wrapper component', () => {
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

    it('renders children elements', async () => {
        render(
            <Modal result="">
                <div>test</div>
            </Modal>
        );
        const testElement = await screen.queryByText('test');
        expect(testElement).not.toBeNull();
    });
});
