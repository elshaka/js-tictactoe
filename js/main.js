/* eslint-disable import/extensions */
import { Game, Player } from './game.js';
/* eslint-enable import/extensions */
const playerOneName = document.querySelector('#inpPlayerOne');
const playerTwoName = document.querySelector('#inpPlayerTwo');
const board = document.querySelector('#board');
board.style.display = "none";
const modalHeader = document.querySelector('#modalLabel');
const startBtn = document.querySelector('#startGameBtn')

const boxes = document.querySelectorAll('.box');
var game = Game();
                     
const updateBoard = (e) => {
  if (!game) {return;}
  if (!game.getFinished()) {
    const button = e.target;
    const number = parseInt(button.dataset.number, Math.radix);
    game.play(number);
    button.innerHTML = game.getBoard().flat()[number - 1];
  }
  if (game.getFinished()) {
    const winner = game.getWinner();
    modalHeader.innerHTML = winner ? `Player ${winner.name} has won!` : 'Draw!';
  }
};

const startGame = (e) => {
  if (game && game.getGameState() && game.getFinished()) {
    game.restartGame();
    boxes.forEach( (box) => box.innerHTML = "-" );
    modalHeader.innerHTML = "TicTacToe";
    board.style.display = "none";
    startBtn.innerHTML = "<h1> Start Game? </h1>"
    return;
  }
  boxes.forEach( (box) => box.innerHTML = "-" );
  modalHeader.innerHTML = "TicTacToe";
  if (!playerOneName.value || !playerTwoName.value){
    modalHeader.innerHTML = "<span class='text-danger'>Please enter names for both Players!</span>";
    return;
  }
  game.setPlayers(Player(playerOneName.value,'X'), Player(playerTwoName.value,'O'));
  game.startGame();
  startBtn.innerHTML = "<h1> Restart Game? </h1>"
  board.style.display = "block";

};

startBtn.addEventListener('click', startGame);
boxes.forEach((button) => {
  button.addEventListener('click', updateBoard);
});
