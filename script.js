const container = document.getElementById("container");
const indicator = document.getElementById("indicator");
const resetButton = document.getElementById("reset");
// false = X, true = O
let Switch = false;
const X = "X";
const O = "O";
let gameOver = false; // Flag to track if the game is over
indicator.textContent = "Player X's turn";
// Event listener for clicks on the container
container.addEventListener('click', function() {
    if (!gameOver) { // Check if the game is over
        switchValue();
        const winner = checkWin();
        if (winner) {
            gameOver = true;
            indicator.textContent = `Player ${winner} wins!`;
        }
    }
});

// Event listener for the reset button
resetButton.addEventListener('click', function() {
    reset();
});

// Function to create the grid
function createGrid(rows, cols) {
    container.innerHTML = '';

    for (let i = 0; i < rows * cols; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        container.appendChild(gridItem);
    }
}

// Function to handle switching between X and O
function switchValue() {
    if (!event.target.classList.contains('grid-item') || event.target.textContent) {
        return; // Exit the function if the clicked element is not a grid item or already contains text
    }
    Switch = !Switch;
    console.log("Switch Value: " + Switch);
    if (Switch) {
        if (event.target.classList.contains('grid-item') && !event.target.textContent) {
            indicator.textContent = "Player O's turn";
            event.target.textContent = X;
        }
    } else {
        if (event.target.classList.contains('grid-item') && !event.target.textContent) {
            indicator.textContent = "Player X's Turn";
            event.target.textContent = O;
        }
    }
}

// Function to check if there's a winner
function checkWin() {
    const gridItems = document.querySelectorAll('.grid-item');
    const winningCombos = [
        [0, 1, 2], 
        [3, 4, 5],  
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]  
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gridItems[a].textContent && gridItems[a].textContent === gridItems[b].textContent && gridItems[a].textContent === gridItems[c].textContent) {
            return gridItems[a].textContent;
        }
    }

    return null; // Return null if no winner
}

// Function to reset the game
function reset() {
    const gridItems = document.querySelectorAll('.grid-item');
    indicator.textContent = "Player X's turn"; // Reset indicator to default
    gameOver = false; // Reset game over flag

    gridItems.forEach(item => {
        item.textContent = ''; // Clear text content of each grid item
    });

    Switch = false; // Reset switch to X's turn
}

// Initialize the game with a 3x3 grid
createGrid(3, 3);
