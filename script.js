const container = document.getElementById("container");
const indicator = document.getElementById("indicator");
const resetButton = document.getElementById("reset");
// false = X, True = O
let Switch = false;
const X = "X";
const O = "O";
let gameOver = false; 
indicator.textContent = "Player X's turn";
createGrid(3, 3);
// Event listener for clicks on the container
container.addEventListener('click', function() {
    if (!gameOver) { 
        switchValue();
        const winner = checkWin();
        if (winner === null && isDraw()) {
            indicator.textContent = `Draw!`;
            gameOver = true;
        } else if (winner) {
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
        return; 
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

    return null; 
}

// Function to reset the game
function reset() {
    const gridItems = document.querySelectorAll('.grid-item');
    indicator.textContent = "Player X's turn"; 
    gameOver = false; 

    gridItems.forEach(item => {
        item.textContent = '';
    });

    Switch = false;
}
function isDraw() {
    const gridItems = document.querySelectorAll('.grid-item');
    for (let item of gridItems) {
        if (!item.textContent) {
            return false; 
        }
    }
    return true; 
}

