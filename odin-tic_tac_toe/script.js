const Player = (name, marker) => {
  return { name, marker };
};

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const setMove = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  return { getBoard, reset, setMove };
})();

const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const start = (player1Name, player2Name) => {
    players = [Player(player1Name || "Player 1", "X"), Player(player2Name || "Player 2", "O")];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.reset();
    DisplayController.render();
    DisplayController.setStatus(`${players[0].name}'s turn`);
  };

  const playRound = (index) => {
    if (gameOver) return;

    const currentPlayer = players[currentPlayerIndex];
    if (Gameboard.setMove(index, currentPlayer.marker)) {
      DisplayController.render();
      if (checkWinner()) {
        DisplayController.setStatus(`${currentPlayer.name} wins! 🎉`);
        gameOver = true;
        return;
      }
      if (Gameboard.getBoard().every(cell => cell !== "")) {
        DisplayController.setStatus("It's a tie!");
        gameOver = true;
        return;
      }
      currentPlayerIndex = 1 - currentPlayerIndex;
      DisplayController.setStatus(`${players[currentPlayerIndex].name}'s turn`);
    }
  };

  const checkWinner = () => {
    const b = Gameboard.getBoard();
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return winPatterns.some(pattern =>
      b[pattern[0]] &&
      b[pattern[0]] === b[pattern[1]] &&
      b[pattern[1]] === b[pattern[2]]
    );
  };

  return { start, playRound };
})();

const DisplayController = (() => {
  const boardDiv = document.getElementById("gameboard");
  const statusDiv = document.getElementById("status");

  const render = () => {
    boardDiv.innerHTML = "";
    Gameboard.getBoard().forEach((cell, index) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.textContent = cell;
      square.addEventListener("click", () => GameController.playRound(index));
      boardDiv.appendChild(square);
    });
  };

  const setStatus = (message) => {
    statusDiv.textContent = message;
  };

  document.getElementById("startBtn").addEventListener("click", () => {
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    GameController.start(player1, player2);
  });

  document.getElementById("restartBtn").addEventListener("click", () => {
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    GameController.start(player1, player2);
  });

  return { render, setStatus };
})();
