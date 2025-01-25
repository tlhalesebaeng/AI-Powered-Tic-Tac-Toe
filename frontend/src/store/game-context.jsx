import { createContext, useState } from 'react';

export const GameContext = createContext({
    userDetails: {},
    setUserDetails: () => {},
    opponentDetails: {},
    setOpponentDetails: () => {},
    gameType: '',
    setGameType: () => {},
});

function GameContextProvider({ children }) {
    const [userDetails, setUserDetails] = useState({});
    const [opponentDetails, setOpponentDetails] = useState({});
    const [gameType, setGameType] = useState('');

    const contextValue = {
        userDetails,
        setUserDetails,
        opponentDetails,
        setOpponentDetails,
        gameType,
        setGameType,
    };
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}

export default GameContextProvider;
