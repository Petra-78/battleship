import { Gameboard } from './gameboard.js';

class Player {
  constructor(type) {
    this.type = type;
    this.board = new Gameboard();
    if (type === 'computer') {
      this.board.generateRandomShips([5, 4, 3, 3, 2]);
    }
  }

  attack(player, coordinates) {
    if (this.type === 'human') {
      const [x, y] = coordinates;
      const cell = player.board.board[y][x];

      const alreadyMissed = player.board.missedAttacks.some(
        (coord) => coord[0] === x && coord[1] === y
      );

      if (alreadyMissed || (cell && cell.hit === true)) {
        return { result: 'invalid', again: true };
      }

      const result = player.board.receiveAttack(x, y);

      if (result === 'hit' || result === 'sunk') {
        return { result, again: true };
      }

      if (result === 'miss' || result === 'all ships have sunk') {
        return { result, again: false };
      }
    } else if (this.type === 'computer') {
      while (true) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const cell = player.board.board[y][x];

        const alreadyMissed = player.board.missedAttacks.some(
          (coord) => coord[0] === x && coord[1] === y
        );

        if (alreadyMissed || (cell && cell.hit === true)) {
          continue;
        }

        const result = player.board.receiveAttack(x, y);

        if (result === 'hit' || result === 'sunk') {
          return { result, again: true };
        }

        if (result === 'miss' || result === 'all ships have sunk') {
          return { result, again: false };
        }
      }
    }
  }
}

export { Player };
