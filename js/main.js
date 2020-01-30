const Player = name => ({ name });

const game = ((player1, player2) => {
  let currentPlayer = player1;
  const finished = false;
  const winner = null;
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const getBoard = () => board;
  const isFinished = () => {};
  const play = (move) => {
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
    getBoard, play, finished, winner,
  };
})(Player('X'), Player('O'));


game.getBoard();
