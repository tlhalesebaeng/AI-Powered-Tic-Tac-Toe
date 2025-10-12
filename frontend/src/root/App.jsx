import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './RoutesConfig.jsx';

const router = createBrowserRouter(routesConfig);

export default function App() {
    return <RouterProvider router={router} />;
}
