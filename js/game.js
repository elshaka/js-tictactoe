const Player = (name, symbol) => ({ name, symbol });

const Game = () => {
  let player1;
  let player2;
  let currentPlayer;
  let finished = false;
  let winner = null;
  let gameStarted = false;
  let board =[null, null, null, null, null, null, null, null, null];

  const getBoard = () => board;
  const getWinner = () => winner;
  const getGameState = () => gameStarted;

  const startGame = () => gameStarted = true;
  const restartGame = () => {
    currentPlayer = player1;
    finished = false;
    winner = null;
    gameStarted = false;
    board =[null, null, null, null, null, null, null, null, null];
  }
  const setPlayers = (one, two) => {
    player1 = one;
    player2 = two;
    currentPlayer = player1;
  }
  const getFinished = () => finished;
  const isFinished = () => {
  const winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const gameWon = winningCombo.some((i) => board[i[0]] === board[i[1]]
      && board[i[1]] === board[i[2]] && board[i[0]]);
    const boardisFull = board.flat().every((x) => x !== null);

    finished = gameWon || boardisFull;
    if (gameWon) { winner = currentPlayer; }

    return finished;
  };
  
  const play = (move) => {
    if (finished) { return false; }
    if (move < 1 || move > 9) {
      return false;
    }
    move -= 1;

    if (board[move]) {
      return false;
    }

    board[move] = currentPlayer.symbol;

    if (!isFinished()) {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    return true;
  };

  return {
    getBoard, play, setPlayers, restartGame, startGame, getWinner, getFinished, getGameState,
  };
};

export { Game, Player };
