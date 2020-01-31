/* eslint-disable import/extensions */
import { Game, Player } from './game.js';
import boardToHTML from './html.js';
/* eslint-enable import/extensions */

const gameLoader = (() => {
  const newGameScreen = document.getElementById('newGameScreen');
  const boardScreen = document.getElementById('boardScreen');
  const playerOneInput = document.getElementById('playerOneName');
  const playerTwoInput = document.getElementById('playerTwoName');
  const startBtn = document.getElementById('startGameBtn');
  const restartBtn = document.getElementById('restartGameBtn');
  const boardTitle = document.getElementById('boardTitle');
  const board = document.getElementById('board');

  const hide = (element) => { element.style.display = 'none'; };
  const show = (element) => { element.style.display = 'block'; };
  const load = () => {
    startBtn.addEventListener('click', () => {
      const playerOneName = playerOneInput.value;
      const playerTwoName = playerTwoInput.value;
      const game = Game(Player(playerOneName, 'X'), Player(playerTwoName, 'O'));

      boardTitle.innerHTML = `${playerOneName} (X) vs ${playerTwoName} (O)`;
      board.innerHTML = boardToHTML(game.getBoard());

      document.querySelectorAll('.box').forEach(box => box.addEventListener('click', (e) => {
        if (!game.getFinished()) {
          const box = e.target;
          const number = parseInt(box.dataset.number, Math.radix);
          game.play(number);
          box.innerHTML = game.getBoard()[number];
        }
        if (game.getFinished()) {
          const winner = game.getWinner();
          boardTitle.innerHTML = winner ? `${winner.name} (${winner.symbol}) has won!` : 'It\'s a Draw!';
        }
      }));

      hide(newGameScreen);
      show(boardScreen);
    });

    restartBtn.addEventListener('click', () => {
      show(newGameScreen);
      hide(boardScreen);
    });
  };
  return { load };
})();

gameLoader.load();
