const board = Array(9).fill(null);

function cellClicked(cell, index) {
    if (board[index] || checkWinner(board, 'X') || checkWinner(board, 'O')) {
        return;
    }
    board[index] = 'X';
    cell.textContent = 'X';
    if (checkWinner(board, 'X')) {
        setTimeout(() => alert("Player wins!"), 100);
        return;
    } else if (isBoardFull(board)) {
        setTimeout(() => alert("It's a tie!"), 100);
        return;
    }

    const bestMove = findBestMove(board);
    board[bestMove] = 'O';
    document.getElementsByClassName('cell')[bestMove].textContent = 'O';
    if (checkWinner(board, 'O')) {
        setTimeout(() => alert("AI wins!"), 100);
    }
}

function isBoardFull(board) {
    return board.every(cell => cell !== null);
}

function checkWinner(board, player) {
    const waysToWin = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return waysToWin.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function minimax(board, depth, isMaximizing) {
    if (checkWinner(board, 'O')) {
        return 10 - depth;
    } else if (checkWinner(board, 'X')) {
        return depth - 10;
    } else if (isBoardFull(board)) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function findBestMove(board) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}
