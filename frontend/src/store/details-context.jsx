import { createContext, useState } from 'react';

export const DetailsContext = createContext({
    details: {},
    addUser: () => {},
    addOpponent: () => {},
});

export default function DetailsContextProvider({ children }) {
    const [details, setDetails] = useState({});

    function addUser(name, symbol) {
        setDetails((prevDetails) => ({
            ...prevDetails,
            username: name,
            userSymbol: symbol,
        }));
    }

    function addOpponent(name, symbol) {
        setDetails((prevDetails) => ({
            ...prevDetails,
            opponentUsername: name,
            opponentSymbol: symbol,
        }));
    }

    const contextValue = {
        details,
        addUser,
        addOpponent,
    };
    return (
        <DetailsContext.Provider value={contextValue}>
            {children}
        </DetailsContext.Provider>
    );
}
