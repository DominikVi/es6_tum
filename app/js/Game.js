import * as Grid from 'classes/Grid';
import * as Food from 'classes/Food';
import * as Snake from 'classes/Snake';

export default class {
  constructor(canvas, cellsX = 20, cellsY = 20, playerCount = 1) {
    this.canvas = canvas;

    this.grid = new Grid(this, canvas.width, canvas.height, cellsX, cellsY);
    this.food = new Food(this, this.grid, 5000);

    this.players = [];
    this.players.push(new Snake(this, this.grid,  "#ff0000", 500));
  }

  update(timestamp) {

  }

  draw(ctx) {
    // clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.grid.draw(ctx);
    this.food.draw(ctx);

    this.players.forEach(player => {
      player.draw(ctx);
    });
  }
}
