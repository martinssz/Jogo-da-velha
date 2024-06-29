const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cellIndex = e.target.getAttribute('data-index');
    if (gameBoard[cellIndex] !== '' || !isGameActive) {
        return;
    }
    updateCell(e.target, cellIndex);
    checkForWinner();
};

const updateCell = (cell, index) => {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
};

const updateStatus = () => {
    if (!isGameActive) {
        return;
    }
    statusText.textContent = `Vez do jogador: ${currentPlayer}`;
};

const checkForWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `O jogador ${currentPlayer === 'X' ? 'O' : 'X'} venceu!`;
        isGameActive = false;
    } else if (!gameBoard.includes('')) {
        statusText.textContent = 'Empate!';
        isGameActive = false;
    }
};

const resetGame = () => {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    cells.forEach(cell => (cell.textContent = ''));
    updateStatus();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
updateStatus();
