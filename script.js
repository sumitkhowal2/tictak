 let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const statusElement = document.getElementById('status');
const boardElement = document.getElementById('board');
const resetButton = document.getElementById('resetButton');

function handleCellClick(index) {
    if (gameBoard[index] === '' && !isGameWon()) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (isGameWon()) {
            displayResult(`Player ${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            displayResult('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function renderBoard() {
    boardElement.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = value;
        cell.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cell);
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    statusElement.textContent = 'Player X\'s turn';
    renderBoard();
    resetButton.style.display = 'inline'; // Show the reset button
}

function isGameWon() {
    // Check rows, columns, and diagonals for a win
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winPatterns.some(pattern =>
        gameBoard[pattern[0]] !== '' &&
        gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
        gameBoard[pattern[1]] === gameBoard[pattern[2]]
    );
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function displayResult(result) {
    statusElement.textContent = result;
    resetButton.style.display = 'inline'; // Show the reset button
}

// Initial rendering
renderBoard();

