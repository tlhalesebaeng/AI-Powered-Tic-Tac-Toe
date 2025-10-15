import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './RoutesConfig.jsx';
import { describe } from 'vitest';

// To check if a route renders a component we check if the few necessary
// elements of the component are shown (Vitest promotes this kind of testing - What the user will see -
// instead of checking the component reference)
describe('RoutesConfig', () => {
    it('renders the Error component under non-existing route', async () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/non-existing-route'],
        });

        render(<RouterProvider router={router} />);
        const text = await screen.findByRole('heading', {
            level: 2,
            name: 'An Error Has Occurred',
        });
        expect(text).toBeInTheDocument();
    });

    it('renders CreateUsername component under "/" route', async () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/'],
        });

        render(<RouterProvider router={router} />);
        const text = await screen.findByText('Create a temporary username');
        expect(text).toBeInTheDocument();

        const input = await screen.findByPlaceholderText(/username/i);
        expect(input).toBeInTheDocument();

        const btn = await screen.findByRole('button', { name: 'Continue' });
        expect(btn).toBeInTheDocument();
    });

    it('renders CreateSession component under "/type/online" route', async () => {
        // Add this element so that it can act as a hook to the SessionModal
        const portalHook = document.createElement('div');
        portalHook.setAttribute('id', 'modal');
        document.body.appendChild(portalHook);

        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/type/online'],
        });

        render(<RouterProvider router={router} />);

        const heading = await screen.findByRole('heading', {
            level: 2,
            name: 'Write opponent username',
        });
        expect(heading).toBeInTheDocument();

        const input = await screen.findByPlaceholderText(/username/i);
        expect(input).toBeInTheDocument();

        const paragraph = await screen.findByText(/your username: /i);
        expect(paragraph).toBeInTheDocument();

        const btn = await screen.findByRole('button', { name: 'Continue' });
        expect(btn).toBeInTheDocument();

        // Remove the portal hook element from the dom
        portalHook.remove();
    });

    it('renders DifficultySelection component under "/type/ai" route', async () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/type/ai'],
        });

        render(<RouterProvider router={router} />);

        const easyBtn = await screen.findByRole('button', { name: 'Easy' });
        expect(easyBtn).toBeInTheDocument();

        const normalBtn = await screen.findByRole('button', { name: 'Normal' });
        expect(normalBtn).toBeInTheDocument();

        const hardBtn = await screen.findByRole('button', { name: 'Hard' });
        expect(hardBtn).toBeInTheDocument();
    });
});
