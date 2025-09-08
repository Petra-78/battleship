function renderBoards(player, grid) {
  const gameboard = player.board.board;
  const container = document.querySelector(`.${grid}`);
  container.innerHTML = '';

  gameboard.forEach((row) => {
    row.forEach((cell) => {
      const div = document.createElement('div');
      div.classList.add('cell');
      div.style.backgroundColor = 'var(--purple)';

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

export { renderBoards };
