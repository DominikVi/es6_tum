import * as Grid from 'classes/Grid';

export default class {
  constructor(canvas, cellsX = 20, cellsY = 20, playerCount = 1) {
    this.canvas = canvas;


    this.grid = new Grid(canvas.width, canvas.height, cellsX, cellsY);
  }

  update(timestamp) {

  }

  draw(ctx) {
    // clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.grid.draw(ctx);
  }
}
