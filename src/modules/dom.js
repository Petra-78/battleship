function renderBoards(player, grid) {
  const gameboard = player.board.board;
  const container = document.querySelector(`.${grid}`);
  container.innerHTML = '';

  gameboard.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement('div');
      div.classList.add('cell');

      div.dataset.x = x;
      div.dataset.y = y;

      div.style.backgroundColor = 'var(--purple)';

      const isMissed = player.board.missedAttacks.some(
        ([mx, my]) => mx === x && my === y
      );
      if (isMissed) {
        div.style.backgroundColor = 'var(--light-purple)';
      }

      if (cell !== 0) {
        if (player.type === 'computer') {
          div.style.backgroundColor = 'var(--green)';
        } else div.style.backgroundColor = 'var(--green)';
        if (cell.hit === true) {
          div.style.backgroundColor = 'var(--red)';
          if (cell.hit === true && cell.ship.sunk === true) {
            div.style.backgroundColor = 'var(--green-sunk)';
          }
        }
      }
      container.appendChild(div);
    });
  });
}

const shipsPopup = document.getElementById('placementPopup');
const shipsGrid = document.getElementById('placementGrid');

document.getElementById('nextBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('.player-name');
  const input = document.getElementById('playerName').value.trim();
  name.textContent = input;
  document.getElementById('namePopup').style.display = 'none';
  shipsPopup.style.display = 'flex';
  renderPlacementGrid();
});

function renderPlacementGrid() {
  shipsGrid.innerHTML = '';
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      shipsGrid.appendChild(cell);
    }
  }
}

export { renderBoards };
