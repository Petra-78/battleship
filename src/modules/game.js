import { Player } from '../factories/players';
import { renderBoards } from './dom';

const player1 = new Player('human');
const computer = new Player('computer');

player1.board.placeShip(2, [0, 1], 'horizontal');
player1.board.placeShip(3, [6, 1], 'horizontal');
player1.board.placeShip(3, [9, 3], 'vertical');
player1.board.placeShip(4, [5, 5], 'vertical');
player1.board.placeShip(5, [0, 9], 'horizontal');

computer.attack(player1);

console.log(computer.board);

renderBoards(player1, 'grid1');
renderBoards(computer, 'grid2');
