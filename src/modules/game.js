import { Player } from '../factories/players';
import { renderBoards } from './dom';
import { Ship } from '../factories/ship';

let player = new Player('human');

const initGame = function () {
  const p1 = player;
  const p2 = new Player('computer');

  renderBoards(p1, 'grid1');
  renderBoards(p2, 'grid2');

  const computerContainer = document.querySelector('.grid2');

  computerContainer.addEventListener('click', (e) => {
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;

    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);

    const alreadyAttacked = p2.board.missedAttacks;
    for (const coor of alreadyAttacked) {
      if (x === coor[0] && y === coor[1]) return null;
    }

    p1.attack(p2, [x, y]);
    renderBoards(p2, 'grid2');

    let winner = checkWinner(p1, p2);
    if (winner) {
      return;
    }

    p2.attack(p1);
    renderBoards(p1, 'grid1');

    winner = checkWinner(p1, p2);
    if (winner) {
      return;
    }
  });
};

function checkWinner(player1, player2) {
  const winnerName = document.getElementById('winner-text');
  if (player1.board.isAllSunk()) {
    winnerName.textContent = 'Computer won!';
    return (document.getElementById('winnerPopup').style.display = 'flex');
  } else if (player2.board.isAllSunk()) {
    const inputName = document.getElementById('playerName').value.trim();
    winnerName.textContent = `${inputName} won!`;
    return (document.getElementById('winnerPopup').style.display = 'flex');
  } else {
    return null;
  }
}

export { player, initGame };
