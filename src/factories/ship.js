class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  isSunk() {
    if (this.length === this.hits) {
      this.sunk = true;
    } else {
      this.sunk = false;
    }
  }

  hit() {
    if (this.sunk !== true) {
      this.hits += 1;
      this.isSunk();
    }
  }
}

export { Ship };
