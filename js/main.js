/* eslint-disable import/extensions */
import { game } from './game.js';
/* eslint-enable import/extensions */

const updateBoard = (e) => {
  if (!game.getFinished()) {
    const button = e.target;
    const number = parseInt(button.dataset.number, Math.radix);
    game.play(number);
    button.innerHTML = game.getBoard().flat()[number - 1];
  }
  if (game.getFinished()) {
    const winner = game.getWinner();

    alert(winner ? `${winner.name} has woasdasdasn!` : 'alskdjasldkj!');
  }
};

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', updateBoard);
});
