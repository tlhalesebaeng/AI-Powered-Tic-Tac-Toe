import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GamePage from './pages/GamePage';
import LandingPage from './pages/LandingPage.jsx';
import RootLayout from './pages/RootLayout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import TypesSelection from './pages/TypesSelection.jsx';
import CreateSession from './pages/CreateSession.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
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
                path: '/type/ai/game',
                element: <GamePage />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
