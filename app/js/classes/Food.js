export default class {
  constructor(game, grid, respawnInterval = 5000) {
    this.game;
    this.grid = grid;
    this.respawnInterval = respawnInterval;

    this.respawn();
  }

  respawn() {
    this.position = this.grid.getRandomCell();

    // respawn can be triggered from outside (e.g. food was eaten) => reset timer in this case
    if (this.respawnTimer) {
      clearTimeout(this.respawnTimer)
    }
    this.respawnTimer = setTimeout(this.respawn.bind(this), this.respawnInterval);
  }

  draw(ctx) {
    const [width, height] = [this.grid.cellWidth, this.grid.cellHeight];
    const offsetX = width * 0.5,
          offsetY = height * 0.5;

    const pixelPos = this.grid.cellPosToPixelPos(this.position);

    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.arc(pixelPos.x + offsetX,
            pixelPos.y + offsetY,
            Math.min(width, height) * 0.4, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
