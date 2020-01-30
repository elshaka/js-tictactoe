const Player = name => ({ name });

const game = ((player1, player2) => {
  let currentPlayer = player1;
  let finished = false;
  let winner = null;
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const getBoard = () => board;
  const getWinner = () => winner;
  const getFinished = () => finished;
  const isFinished = () => {
    const flatBoard = board.flat();
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
    const gameWon = winningCombo.some((i) => flatBoard[i[0]] === flatBoard[i[1]]
      && flatBoard[i[1]] === flatBoard[i[2]] && flatBoard[i[0]]);
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
    const x = Math.floor(move / 3);
    const y = move % 3;

    if (board[x][y]) {
      return false;
    }

    board[x][y] = currentPlayer.name;

    if (!isFinished()) {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    return true;
  };

  return {
    getBoard, play, getWinner, getFinished,
  };
})(Player('X'), Player('O'));

export { game };
