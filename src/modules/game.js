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

    let winner = checkWinner(p1, p2);
    if (winner) return;

    if (again) {
      return;
    }

    playerCanClick = false;

    function computerTurn() {
      const { result: compResult, again: compAgain } = p2.attack(p1);
      renderBoards(p1, 'grid1');

      let winner = checkWinner(p1, p2);
      if (winner) return;

      if (compAgain) {
        setTimeout(computerTurn, 800);
      } else {
        playerCanClick = true;
      }
    }

    setTimeout(computerTurn, 800);
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
