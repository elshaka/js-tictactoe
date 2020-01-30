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
  const isFinished = () => {
    console.log(board.flat());
    const flatBoard = board.flat();
    const winning_combo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    
    const gameWon = winning_combo.some( (i) => {
      if (flatBoard[i[0]] === flatBoard[i[1]] && flatBoard[i[1]] === flatBoard[i[2]] && flatBoard[i[0]] != null)
      {
        console.log(currentPlayer.name + "has won!");
        finished = true;
        winner = currentPlayer;
        return true;
      }
    });
        
    const boardisFull = board.flat().every( (x) => x !== null )
    if(boardisFull) {console.log("Full"); finished = true;}
    
    return finished;
  };
  const play = (move) => {
    if (finished) {return false;}
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
