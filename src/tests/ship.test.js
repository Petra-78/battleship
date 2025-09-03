import { Ship } from '../factories/ship';

test('makes a new ship object', () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
  expect(ship.sunk).toBe(false);
});

test('ships hit count to increase but stop after ships length', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
  ship.hit();
  expect(ship.hits).toBe(3);
  ship.hit();
  expect(ship.hits).toBe(3);
});

test('ship sunk changes to true after hit count equals length count', () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.sunk).toBe(true);
});
