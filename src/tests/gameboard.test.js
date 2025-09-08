import { Gameboard } from '../factories/gameboard';

test('make a 10x10 grid', () => {
  const board = new Gameboard();
  expect(board.board).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('places a ship on the board vertically', () => {
  const board = new Gameboard();
  const ship = board.placeShip(3, [0, 1], 'vertical');
  expect(board.board[0][1]).toBe(ship);
  expect(board.board[0][2]).toBe(ship);
  expect(board.board[0][3]).toBe(ship);

  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
  expect(ship.sunk).toBe(false);
});

test('places a ship on the board horizontally', () => {
  const board = new Gameboard();
  const ship = board.placeShip(3, [0, 0], 'horizontal');
  expect(board.board[0][0]).toBe(ship);
  expect(board.board[1][0]).toBe(ship);
  expect(board.board[2][0]).toBe(ship);

  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
  expect(ship.sunk).toBe(false);
});

test('throws an error when overlapped', () => {
  const board = new Gameboard();
  board.placeShip(3, [0, 1], 'horizontal');
  expect(() => {
    board.placeShip(3, [0, 1], 'vertical');
  }).toThrow('this spot is already taken');
});

test('returns false when ship placed out of board', () => {
  const board = new Gameboard();
  const ship = board.placeShip(3, [0, 9], 'vertical');
  expect(ship).toBe(false);
});

test('ships array contains the placed ships', () => {
  const board = new Gameboard();
  const ship1 = board.placeShip(3, [0, 0], 'horizontal');
  const ship2 = board.placeShip(2, [1, 2], 'horizontal');
  const ship3 = board.placeShip(5, [5, 0], 'vertical');
  expect(board.ships[0]).toBe(ship1);
  expect(board.ships[1]).toBe(ship2);
  expect(board.ships[2]).toBe(ship3);
});

test('sends hit to a ship', () => {
  const board = new Gameboard();
  const ship = board.placeShip(3, [0, 0], 'horizontal');
  const attack = board.receiveAttack(0, 0);
  expect(attack).toBe('hit');
});

test('returns the coordinates if the hit missed', () => {
  const board = new Gameboard();
  const ship = board.placeShip(3, [0, 0], 'vertical');
  const attack = board.receiveAttack(0, 1);
  expect(attack).toEqual('hit');
});

test('notifies if all ships have been sunk', () => {
  const board = new Gameboard();
  const ship = board.placeShip(3, [0, 0], 'horizontal');
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  const attack3 = board.receiveAttack(2, 0);
  expect(attack3).toBe('all ships have sunk');
});

test('generates random ship placement', () => {
  const board = new Gameboard();
  const randomShips = board.generateRandomShips([5, 4, 3, 3, 2]);

  expect(board.ships.length).toBe(5);
});
