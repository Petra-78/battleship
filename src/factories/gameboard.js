import { Ship } from './ship';

class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    for (let i = 0; i < 10; i++) {
      const rows = [];
      for (let j = 0; j < 10; j++) {
        rows.push(0);
      }
      this.board.push(rows);
    }
  }

  placeShip(length, coordinates) {
    const ship = new Ship(length);
    this.ships.push(ship);
    let x = coordinates[0];
    let y = coordinates[1];
    for (let i = 0; i < length; i++) {
      this.board[x + i][y] = ship;
    }
    return ship;
  }
}

export { Gameboard };
