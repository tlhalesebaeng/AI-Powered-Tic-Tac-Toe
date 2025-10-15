import { useContext } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DetailsContextProvider, { DetailsContext } from './details-context.jsx';
import userEvent from '@testing-library/user-event';

const ContextTester = () => {
    const { details, addUser, addOpponent } = useContext(DetailsContext);
    return (
        <>
            <ul>
                <li>{details.username}</li>
                <li>{details.userSymbol}</li>
                <li>{details.opponentUsername}</li>
                <li>{details.opponentSymbol}</li>
            </ul>
            <button onClick={() => addUser('test-user', 'test-user-symbol')}>
                Add User
            </button>
            <button onClick={() => addOpponent('test-opp', 'test-opp-symbol')}>
                Add Opponent
            </button>
        </>
    );
};

describe('Details Context', () => {
    it('contains correct default details', async () => {
        render(
            <DetailsContextProvider>
                <ContextTester />
            </DetailsContextProvider>
        );

        const testUser = await screen.queryByText('test-user');
        expect(testUser).toBeNull();

        const testUserSymbol = await screen.queryByText('test-user-symbol');
        expect(testUserSymbol).toBeNull();

        const testOpp = await screen.queryByText('test-opp');
        expect(testOpp).toBeNull();

        const testOppSymbol = await screen.queryByText('test-opp-symbol');
        expect(testOppSymbol).toBeNull();
    });

    it('renders correct user details', async () => {
        render(
            <DetailsContextProvider>
                <ContextTester />
            </DetailsContextProvider>
        );

        const addUserBtn = await screen.getByText('Add User');
        await userEvent.click(addUserBtn);

        const testUser = await screen.queryByText('test-user');
        expect(testUser).not.toBeNull();

        const testUserSymbol = await screen.queryByText('test-user-symbol');
        expect(testUserSymbol).not.toBeNull();
    });

    it('renders correct opponent details', async () => {
        render(
            <DetailsContextProvider>
                <ContextTester />
            </DetailsContextProvider>
        );

        const addUserBtn = await screen.getByText('Add Opponent');
        await userEvent.click(addUserBtn);

        const testUser = await screen.queryByText('test-opp');
        expect(testUser).not.toBeNull();

        const testUserSymbol = await screen.queryByText('test-opp-symbol');
        expect(testUserSymbol).not.toBeNull();
    });
});
