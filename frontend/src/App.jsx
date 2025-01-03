import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GamePage from './pages/GamePage';
import LandingPage from './pages/LandingPage.jsx';
import RootLayout from './pages/RootLayout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

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
                path: '/game',
                element: <GamePage />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
