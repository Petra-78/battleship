class Gameboard {
  constructor() {
    const board = [];
    const cells = 0;
    for (let i = 0; i < 10; i++) {
      const rows = [];
      for (let j = 0; j < 10; j++) {
        rows.push(cells);
      }
      board.push(rows);
    }
    return board;
  }
}

export { Gameboard };
