import { Ship } from './ship.js';

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

    let x = coordinates[0];
    let y = coordinates[1];
    if (direction === 'horizontal' && x + length <= 10 && x >= 0) {
      for (let i = 0; i < length; i++) {
        if (this.board[x + i][y] !== 0) {
          throw new Error('that spot is already taken');
        } else {
          this.board[x + i][y] = ship;
        }
      }
      this.ships.push(ship);
      return ship;
    } else if (direction === 'vertical' && y + length <= 10 && y >= 0) {
      for (let i = 0; i < length; i++) {
        if (this.board[x][y + i] !== 0) {
          throw new Error('this spot is already taken');
        } else {
          this.board[x][y + i] = ship;
        }
      }
      this.ships.push(ship);
      return ship;
    } else return false;
  }

  receiveAttack(x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error('invalid coordinates');
    }
    if (this.board[x][y] !== 0) {
      const ship = this.board[x][y];
      ship.hit();
      if (this.isAllSunk() === true) return 'all ships have sunk';
      else if (ship.isSunk() === true) return 'ship has sunk';
      else return 'hit';
    } else {
      this.missedAttacks.push([x, y]);
      return 'miss';
    }
  }

  isAllSunk() {
    let sunkCount = 0;
    for (const ship of this.ships) {
      if (ship.sunk === true) sunkCount++;
    }
    if (sunkCount === this.ships.length) return true;
    else return false;
  }

  generateRandomShips(ships) {
    for (const ship of ships) {
      let placed = false;
      while (placed !== true) {
        try {
          const generateX = Math.floor(Math.random() * (10 - ship));
          const generateY = Math.floor(Math.random() * (10 - ship));
          const direction = Math.random();
          if (direction > 0.5) {
            this.placeShip(ship, [generateX, generateY], 'horizontal');
          } else {
            this.placeShip(ship, [generateX, generateY], 'vertical');
          }
          placed = true;
        } catch (Error) {
          //do nothing
        }
      }
    }
  }
}

export { Gameboard };
