import { Ship } from './ship';

class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    this.missedAttacks = [];
    for (let i = 0; i < 10; i++) {
      const rows = [];
      for (let j = 0; j < 10; j++) {
        rows.push(0);
      }
      this.board.push(rows);
    }
  }

  placeShip(length, coordinates, direction) {
    const ship = new Ship(length);
    this.ships.push(ship);
    let x = coordinates[0];
    let y = coordinates[1];
    if (direction === 'vertical' && x + length <= 10 && x >= 0) {
      for (let i = 0; i < length; i++) {
        if (this.board[x + i][y] !== 0) {
          throw new Error('that spot is already taken');
        } else {
          this.board[x + i][y] = ship;
        }
      }
      return ship;
    } else if (direction === 'horizontal' && y + length <= 10 && y >= 0) {
      for (let i = 0; i < length; i++) {
        if (this.board[x][y + i] !== 0) {
          throw new Error('this spot is already taken');
        } else {
          this.board[x][y + i] = ship;
        }
      }
      return ship;
    } else return false;
  }

  receiveAttack(x, y) {
    if (x < 0 || x > 10 || y < 0 || y > 10) {
      throw new Error('invalid coordinates');
    }
    if (this.board[x][y] !== 0) {
      const ship = this.board[x][y];
      ship.hit();
      const result = this.isALlSunk();
      return result || ship;
    } else {
      this.missedAttacks.push([x, y]);
      return [x, y];
    }
  }

  isALlSunk() {
    let sunkCount = 0;
    for (const ship of this.ships) {
      if (ship.length === ship.hits) {
        ship.sunk = true;
        sunkCount++;
      }
    }
    if (sunkCount === this.ships.length) {
      return true;
    }
  }
}

export { Gameboard };
