import * as Grid from 'classes/Grid';
import * as Food from 'classes/Food';
import * as Snake from 'classes/Snake';

export default class {
  constructor(canvas, cellsX = 20, cellsY = 20, playerCount = 1) {
    this.canvas = canvas;

    this.grid = new Grid(this, canvas.width, canvas.height, cellsX, cellsY);
    this.food = new Food(this, this.grid, 5000);

    this.players = [];
    for (var i = 0; i < playerCount; i++) {
      this.players.push(new Snake(this, this.grid, "#ff0000", playerKeyMappings[i], 500));
    }
  }

  updateInput(event) {
    this.players.forEach(player => player.updateInput(event));
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

const playerKeyMappings = [
  {
    38: "up",    // up arrow
    39: "right", // right arrow
    40: "down",  // down arrow
    37: "left",  // left arrow
  },
  {
    87: "up",    // w
    68: "right", // d
    83: "down",  // s
    65: "left",  // a
  }
]
