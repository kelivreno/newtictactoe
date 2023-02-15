const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset');
const scoreboard = document.getElementById('scoreboard');
let currentPlayer = 'X';
let xScore = 0;
let oScore = 0;
let gameFinished = false;

// Add event listeners to all cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Handle cell click event
function handleCellClick(e) {
  const cell = e.target;
  if (cell.textContent !== '' || gameFinished) {
    return;
  }

  cell.textContent = currentPlayer;
  checkForWin();
  switchPlayer();
}

// Switch players
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check if there's a winner
function checkForWin() {
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
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      endGame(currentPlayer);
      return;
    }
  }

  if (isBoardFull()) {
    endGame('tie');
  }
}

// Check if the board is full
function isBoardFull() {
  for (let cell of cells) {
    if (cell.textContent === '') {
      return false;
    }
  }
  return true;
}

// End the game
function endGame(winner) {
  gameFinished = true;
  if (winner === 'X') {
    xScore++;
  } else if (winner === 'O') {
    oScore++;
  }
  updateScoreboard();
  setTimeout(() => {
    resetGame();
  }, 1000);
}

// Update the scoreboard
function updateScoreboard() {
  scoreboard.textContent = `Player X: ${xScore} | Player O: ${oScore}`;
}

// Reset the game
function resetGame() {
  gameFinished = false;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

// Add event listener to the reset button
resetBtn.addEventListener('click', resetGame);
