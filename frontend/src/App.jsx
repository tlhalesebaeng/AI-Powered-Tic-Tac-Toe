import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GamePage from './pages/GamePage';
import CreateUsername from './features/create-username/CreateUsername.jsx';
import RootLayout from './pages/RootLayout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import TypesSelection from './features/select-types/TypesSelection.jsx';
import CreateSession from './features/create-session/CreateSession.jsx';
import DifficultySelection from './pages/DifficultySelection.jsx';

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
