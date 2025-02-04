import { Outlet } from 'react-router-dom';
import './RootLayout.css';
import GameContextProvider from '../store/game-context';
import DetailsContextProvider from '../store/details-context';

export default function RootLayout() {
    return (
        <main>
            <GameContextProvider>
                <DetailsContextProvider>
                    <Outlet />
                </DetailsContextProvider>
            </GameContextProvider>
        </main>
    );
}
