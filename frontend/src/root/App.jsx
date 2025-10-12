import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GamePage from '../features/game/GamePage.jsx';
import CreateUsername from '../features/create-username/CreateUsername.jsx';
import RootLayout from './RootLayout.jsx';
import ErrorPage from '../features/errors/ErrorPage.jsx';
import TypesSelection from '../features/select-types/TypesSelection.jsx';
import CreateSession from '../features/create-session/CreateSession.jsx';
import DifficultySelection from '../features/select-difficulty/DifficultySelection.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <CreateUsername />,
            },
            {
                path: '/type',
                element: <TypesSelection />,
            },
            {
                path: '/game',
                element: <GamePage />,
            },
            {
                path: '/game/:roomId',
                element: <GamePage />,
            },
            {
                path: '/type/online',
                element: <CreateSession />,
            },
            {
                path: '/type/ai',
                element: <DifficultySelection />,
            },
            {
                path: '/type/ai/:difficulty',
                element: <GamePage />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
