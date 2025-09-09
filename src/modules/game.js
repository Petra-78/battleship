import { Player } from '../factories/players';
import { renderBoards } from './dom';
import { Ship } from '../factories/ship';

const initGame = function () {
  const p1 = new Player('human');
  const p2 = new Player('computer');

  p1.board.placeShip(new Ship(2), [0, 1], 'horizontal');
  p1.board.placeShip(new Ship(3), [6, 1], 'horizontal');
  p1.board.placeShip(new Ship(3), [9, 3], 'vertical');
  p1.board.placeShip(new Ship(4), [5, 5], 'vertical');
  p1.board.placeShip(new Ship(5), [0, 9], 'horizontal');

  renderBoards(p1, 'grid1');
  renderBoards(p2, 'grid2');

  const computerContainer = document.querySelector('.grid2');

  computerContainer.addEventListener('click', (e) => {
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;

    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);

    p1.attack(p2, [x, y]);

    renderBoards(p2, 'grid2');
    renderBoards(p1, 'grid1');

    p2.attack(p1);
    renderBoards(p1, 'grid1');
  });
};

initGame();
