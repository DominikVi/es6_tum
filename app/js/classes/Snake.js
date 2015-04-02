export default class {
  constructor(game, grid, color, moveInterval = 500) {
    this.game = game;
    this.grid = grid;
    this.color = color;
    this.moveInterval = moveInterval;

    this.positions = [grid.getRandomCell()];
    this.direction = "up";

    this.update();
  }

  update() {
    this.move(this.direction);

    this.moveTimer = setTimeout(this.update.bind(this), this.moveInterval);
  }

  move(direction) {
    // inserts new element in move direction at the start of the positions list and removes the last element
    // snake moves through walls and comes out at other side

    switch(direction) {
      case "up":
        if (this.positions[0].y === 0) { // will move into wall
          this.positions.unshift({ x: this.positions[0].x, y: this.grid.cellsY - 1 }) // move to bottom wall
        } else {
          this.positions.unshift({ x: this.positions[0].x, y: this.positions[0].y - 1 }) // move up
        }
        break;

      case "right":
        if (this.positions[0].x === this.grid.cellsX - 1) { // will move into wall
          this.positions.unshift({ x: 0, y: this.positions[0].y }) // move to left wall
        } else {
          this.positions.unshift({ x: this.positions[0].x + 1, y: this.positions[0].y }) // move right
        }
        break;

      case "down":
        if (this.positions[0].y === this.grid.cellsY) { // will move into wall
          this.positions.unshift({ x: this.positions[0].x, y: 0 }) // move to top wall
        } else {
          this.positions.unshift({ x: this.positions[0].x, y: this.positions[0].y + 1 }) // move down
        }
        break;

      case "left":
        if (this.positions[0].x === 0) { // will move into wall
          this.positions.unshift({ x: this.grid.cellsX - 1, y: this.positions[0].y }) // move to left wall
        } else {
          this.positions.unshift({ x: this.positions[0].x - 1, y: this.positions[0].y }) // move left
        }
        break;
    }

    this.positions.pop(); // remove last element of the snake
  }

  draw(ctx) {
    this.positions.forEach(pos => {
      const pixelPos = this.grid.cellPosToPixelPos(pos);

      ctx.rect(pixelPos.x, pixelPos.y, this.grid.cellWidth, this.grid.cellHeight);
      ctx.fillStyle = this.color;
      ctx.fill();
    });
  }
}
