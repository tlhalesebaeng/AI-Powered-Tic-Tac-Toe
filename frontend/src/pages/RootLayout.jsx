import { Outlet } from 'react-router-dom';
import './RootLayout.css';
import GameContextProvider from '../store/game-context';

export default function RootLayout() {
    return (
        <main>
            <GameContextProvider>
                <Outlet />
            </GameContextProvider>
        </main>
    );
}
