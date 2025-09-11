import { Player } from '../factories/players';
import { renderBoards } from './dom';

let player = new Player('human');

const initGame = function () {
  const p1 = player;
  const p2 = new Player('computer');

  renderBoards(p1, 'grid1');
  renderBoards(p2, 'grid2');

  const computerContainer = document.querySelector('.grid2');
  let playerCanClick = true;

  computerContainer.addEventListener('click', function handlePlayerAttack(e) {
    if (!playerCanClick) return;
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;

    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);

    const { result, again } = p1.attack(p2, [x, y]);
    if (result === 'invalid') return;

    renderBoards(p2, 'grid2');
    if (checkWinner(p1, p2)) return;

    if (again) return;

    playerCanClick = false;
    setTimeout(computerTurn, 700);

    function computerTurn() {
      const { x, y, result, again } = p2.attack(p1);
      renderBoards(p1, 'grid1');
      if (checkWinner(p1, p2)) return;

      if (again) {
        setTimeout(computerTurn, 700);
      } else {
        playerCanClick = true;
      }
    }
  });
};

function checkWinner(player1, player2) {
  const winnerName = document.getElementById('winner-text');
  if (player1.board.isAllSunk()) {
    winnerName.textContent = 'Computer won!';
    document.getElementById('winnerPopup').style.display = 'flex';
    return true;
  } else if (player2.board.isAllSunk()) {
    const inputName = document.getElementById('playerName').value.trim();
    winnerName.textContent = `${inputName || 'Player1'} won!`;
    document.getElementById('winnerPopup').style.display = 'flex';
    return true;
  }
  return false;
}

export { player, initGame };
