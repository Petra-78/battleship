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
      const attack = player.board.receiveAttack(coordinates[0], coordinates[1]);
      return attack;
    } else if (this.type === 'computer') {
      const generateX = Math.floor(Math.random() * 10);
      const generateY = Math.floor(Math.random() * 10);
      const attack = player.board.receiveAttack(generateX, generateY);
      return attack;
    }
  }
}

const player1 = new Player('human');
const computer = new Player('computer');
const attack = player1.attack(computer, [0, 0]);
console.log(attack);

export { Player };
