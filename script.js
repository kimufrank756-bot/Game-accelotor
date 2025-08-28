// Get references to DOM elements
const statusDisplay = document.getElementById('statusDisplay');
const gameGrid = document.getElementById('gameGrid');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

// Game state variables
let board = ['', '', '', '', '', '', '', '', '']; // Represents the 9 cells
let currentPlayer = 'X'; // Start with Player X
let gameActive = true; // True if the game is ongoing, false if won or drawn

// Winning conditions (indices of cells that form a win)
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6]  // Diagonal from top-right
];

// Function to update the status display message
const updateStatus = (message) => {
    statusDisplay.textContent = message;
};

// Function to handle a cell click
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // If the cell is already filled or the game is not active, do nothing
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the board and the cell's content
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('filled'); // Add a class to indicate it's filled

    // Check for win or draw
    checkResult();
};

// Function to check if there's a winner or a draw
const checkResult = () => {
    let roundWon = false;

    // Check all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        // If any of the cells in the condition are empty, continue
        if (a === '' || b === '' || c === '') {
            continue;
        }
        // If all three cells match, we have a winner
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        updateStatus(`Player ${currentPlayer} Wins!`);
        gameActive = false; // End the game
        return;
    }

    // Check for a draw (if all cells are filled and no winner)
    let roundDraw = !board.includes(''); // True if no empty cells
    if (roundDraw) {
        updateStatus('Game Draw!');
        gameActive = false; // End the game
        return;
    }

    // If no win or draw, switch to the next player
    changePlayer();
};

// Function to switch the current player
const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s Turn`);
};

// Function to reset the game
const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', '']; // Clear the board
    currentPlayer = 'X'; // Reset to Player X
    gameActive = true; // Set game to active
    updateStatus(`Player ${currentPlayer}'s Turn`); // Update status

    // Clear cell contents and remove 'filled' class
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('filled');
    });
};

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initial status update
updateStatus(`Player ${currentPlayer}'s Turn`);
