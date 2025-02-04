import { createContext, useState } from 'react';

export const GameContext = createContext({
    gameType: '',
    setGameType: () => {},
});

export default function GameContextProvider({ children }) {
    const [gameType, setGameType] = useState('');

    const contextValue = {
        gameType,
        setGameType,
    };
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}
