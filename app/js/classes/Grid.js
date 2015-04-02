import * as Utils from '../utils';

class Grid {
  constructor(game, width, height, cellsX, cellsY) {
    this.game;
    this.width = width;
    this.height = height;
    this.cellsX = cellsX;
    this.cellsY = cellsY;

    this.cellWidth = Math.floor(width / cellsX);
    this.cellHeight = Math.floor(height / cellsY);
  }

  draw(ctx) {
    // vertical lines
    for (var x = 0; x <= this.width; x += this.cellWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
    }

    // horizontal lines
    for (var y = 0; y <= this.height; y += this.cellHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  getRandomCell() {
    return {
      x: Utils.getRandomInt(0, this.cellsX - 1),
      y: Utils.getRandomInt(0, this.cellsY - 1)
    }
  }
}

export default Grid;
