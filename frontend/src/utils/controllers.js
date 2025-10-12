import { WINNING_COMBINATIONS } from './winning-combinations';

export function deriveWinner(gameBoard) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol = gameBoard[combination[0].row][combination[0].col];
        const secondSymbol = gameBoard[combination[1].row][combination[1].col];
        const thirdSymbol = gameBoard[combination[2].row][combination[2].col];

        if (firstSymbol !== null) {
            if (
                firstSymbol === secondSymbol &&
                firstSymbol === thirdSymbol &&
                secondSymbol === thirdSymbol
            ) {
                winner = firstSymbol;
            }
        }
    }

    return winner;
}

export function hasDraw(gameBoard) {
    for (let row = 0; row < gameBoard.length; row++) {
        for (let col = 0; col < gameBoard.length; col++) {
            if (gameBoard[row][col] === null) {
                return false;
            }
        }
    }

    return true;
}

export function resetBoard() {
    const tempBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    return tempBoard;
}
