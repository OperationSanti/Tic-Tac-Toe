let againstAI = false;
let playerX = 'Player X';
let playerO = 'Player O';
let board = Array(9).fill(null);
let currentPlayer = playerX;
let scores = {};
scores[playerX] = 0;
scores[playerO] = 0;

document.getElementById('multiplayer').addEventListener('click', function() {
    playerX = prompt("Enter Player 1's name:", "Player X") || 'Player X';
    playerO = prompt("Enter Player 2's name:", "Player O") || 'Player O';
    document.getElementById('playerX').innerText = playerX + ": 0";
    document.getElementById('playerO').innerText = playerO + ": 0";
    againstAI = false;
    startGame();
    resetGame();
});

document.getElementById('ai').addEventListener('click', function() {
    playerX = "You";
    playerO = "AI";
    document.getElementById('playerX').innerText = playerX + ": 0";
    document.getElementById('playerO').innerText = playerO + ": 0";
    againstAI = true;
    startGame();
    resetGame();
});


document.getElementById('reset').addEventListener('click', resetGame);

document.getElementById('menu').addEventListener('click', function() {
    location.reload();
});

function startGame() {
    document.getElementById('game-mode-selection').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    createBoard();
    if (againstAI && currentPlayer === playerO) {
        makeAIMove();
    }
}

function createBoard() {
    let ticTacToeBoard = document.getElementById('tic-tac-toe-board');
    ticTacToeBoard.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => {
            if (!board[i] && (againstAI || (currentPlayer === playerX || currentPlayer === playerO))) {
                board[i] = currentPlayer;
                cell.innerText = currentPlayer === playerX ? 'X' : 'O';
                cell.classList.add(currentPlayer === playerX ? 'x' : 'o');
                if (checkWin(currentPlayer)) {
                    scores[currentPlayer]++;
                    document.getElementById(currentPlayer === playerX ? 'playerX' : 'playerO').innerText = currentPlayer + ": " + scores[currentPlayer];
                    setTimeout(() => {
                        alert(currentPlayer + ' wins!');
                        resetGame();
                    }, 100);
                } else if (!board.includes(null)) {
                    setTimeout(() => {
                        alert('Draw!');
                        resetGame();
                    }, 100);
                } else {
                    currentPlayer = againstAI ? playerO : (currentPlayer === playerX ? playerO : playerX);
                    if (againstAI && currentPlayer === playerO) {
                        makeAIMove();
                    }
                }
            }
        });
        ticTacToeBoard.appendChild(cell);
    }
}


function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => combination.every(index => board[index] === player));
}

function resetGame() {
    board.fill(null);
    currentPlayer = playerX;
    let cells = Array.from(document.getElementsByClassName('cell'));
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
    if (againstAI && currentPlayer === playerO) {
        makeAIMove();
    }
}

function makeAIMove() {

    if (checkWin(playerX) || checkWin(playerO) || currentPlayer !== playerO) {
        return;
    }


    let availableCells = [];
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            availableCells.push(i);
        }
    }

    let randomIndex = Math.floor(Math.random() * availableCells.length);
    let selectedCellIndex = availableCells[randomIndex];


    board[selectedCellIndex] = currentPlayer;
    let cells = Array.from(document.getElementsByClassName('cell'));
    let selectedCell = cells[selectedCellIndex];
    selectedCell.innerText = 'O';
    selectedCell.classList.add('o');


    if (checkWin(currentPlayer)) {
        scores[currentPlayer]++;
        document.getElementById(currentPlayer === playerX ? 'playerX' : 'playerO').innerText = currentPlayer + ": " + scores[currentPlayer];
        setTimeout(() => {
            alert(currentPlayer + ' wins!');
            resetGame();
        }, 100);
    } else if (!board.includes(null)) {
        setTimeout(() => {
            alert('Draw!');
            resetGame();
        }, 100);
    } else {
        currentPlayer = playerX;
    }
}
