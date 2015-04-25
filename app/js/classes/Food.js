export default class Food {
  constructor(game, grid, color, respawnInterval = 5000) {
    this.game = game;
    this.grid = grid;
    this.color = color;
    this.respawnInterval = respawnInterval;
    this.position = { x: -1, y: -1 }; // initially the food is not on the grid
  }

  resetRespawn() {
    // respawn can be triggered from outside (e.g. food was eaten) => reset timer in this case
    if (this.respawnTimer) {
      clearTimeout(this.respawnTimer);
    }
    this.respawnTimer = setTimeout(this.respawn.bind(this), this.respawnInterval);
  }

  respawn() {
    this.position = this.grid.getRandomCell();

    this.resetRespawn();
  }

  draw(ctx) {
    const [width, height] = [this.grid.cellWidth, this.grid.cellHeight];
    const offsetX = width * 0.5,
          offsetY = height * 0.5;

    const pixelPos = this.grid.cellPosToPixelPos(this.position);

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(pixelPos.x + offsetX,
            pixelPos.y + offsetY,
            Math.min(width, height) * 0.4, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
