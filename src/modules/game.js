import { Player } from '../factories/players';
import './style.css';

const player1 = new Player('human');
const computer = new Player('computer');

player1.board.placeShip(2, [0, 0], 'horizontal');
player1.board.placeShip(3, [2, 1], 'horizontal');
player1.board.placeShip(3, [9, 3], 'vertical');
player1.board.placeShip(4, [5, 4], 'vertical');
player1.board.placeShip(5, [2, 9], 'horizontal');

computer.board.placeShip(2, [0, 0], 'horizontal');
computer.board.placeShip(3, [2, 1], 'horizontal');
computer.board.placeShip(3, [9, 3], 'vertical');
computer.board.placeShip(4, [5, 4], 'vertical');
computer.board.placeShip(5, [2, 9], 'horizontal');
