import { Player } from '../factories/players';
import { Gameboard } from '../factories/gameboard';

test('a new player has its own gameboard', () => {
  const player = new Player();
  expect(player.board).toBeInstanceOf(Gameboard);
});

test('player can attack opponents board', () => {
  const player1 = new Player('human');
  const computer = new Player('computer');
  const attack = player1.attack(computer, [0, 0]);
  expect(attack).toBe('miss');
});
