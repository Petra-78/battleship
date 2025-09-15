import { player, initGame } from './game';
import { Ship } from '../factories/ship';

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
          div.style.backgroundColor = 'var(--purple)';
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

const startGame = document.getElementById('startGame');
const nextBtn = document.getElementById('nextBtn');
const inputName = document.getElementById('playerName');

nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('.player-name');
  const input = inputName.value.trim();
  if (inputName.value === '') name.textContent = 'Player1';
  else name.textContent = input;
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

let shipsToPlace = [5, 4, 3, 3, 2];
let currentShipIndex = 0;
let horizontal = true;

function showHover(x, y) {
  clearHover();

  const shipLength = shipsToPlace[currentShipIndex];
  const cells = [];

  for (let i = 0; i < shipLength; i++) {
    const nx = horizontal ? x + i : x;
    const ny = horizontal ? y : y + i;
    const cell = shipsGrid.querySelector(`[data-x="${nx}"][data-y="${ny}"]`);
    if (!cell) return false;
    cells.push(cell);
  }

  cells.forEach((c) => c.classList.add('hover'));
  return true;
}

function clearHover() {
  shipsGrid
    .querySelectorAll('.hover')
    .forEach((c) => c.classList.remove('hover'));
}

shipsGrid.addEventListener('mousemove', (e) => {
  clearHover();
  if (!e.target.classList.contains('cell')) return;

  const x = parseInt(e.target.dataset.x, 10);
  const y = parseInt(e.target.dataset.y, 10);

  showHover(x, y);
});

shipsGrid.addEventListener('mouseleave', clearHover);

shipsGrid.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cell')) return;

  const x = parseInt(e.target.dataset.x, 10);
  const y = parseInt(e.target.dataset.y, 10);

  const shipLength = shipsToPlace[currentShipIndex];

  const placed = player.board.placeShip(
    new Ship(shipLength),
    [x, y],
    horizontal ? 'horizontal' : 'vertical'
  );

  if (!placed) {
    alert('❌ Cannot place ship here');
    return;
  }

  shipsGrid.querySelectorAll('.hover').forEach((c) => {
    c.classList.remove('hover');
    c.classList.add('placed');
  });

  currentShipIndex++;

  if (currentShipIndex >= shipsToPlace.length) {
    startGame.disabled = false;
  }
});

startGame.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(player.board);
  shipsPopup.style.display = 'none';
  initGame();
});

const newGame = document.getElementById('newGame');
newGame.addEventListener('click', () => {
  location.reload();
});

const rotateBtn = document.getElementById('rotateBtn');
rotateBtn.addEventListener('click', () => {
  if (horizontal === true) horizontal = false;
  else horizontal = true;
});

export { renderBoards };
