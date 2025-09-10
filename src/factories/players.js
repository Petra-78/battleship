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

      if (alreadyMissed === true || cell.hit === true) {
        alert('you already attacked there!');
        return 'invalid';
      }

      return player.board.receiveAttack(x, y);
    } else if (this.type === 'computer') {
      let valid = false;
      let x, y;

      while (valid !== true) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        const cell = player.board.board[y][x];

        const alreadyMissed = player.board.missedAttacks.some(
          (coord) => coord[0] === x && coord[1] === y
        );

        if (alreadyMissed === false || cell === 0) {
          valid = true;
        }
      }

      return player.board.receiveAttack(x, y);
    }
  }
}

export { Player };
