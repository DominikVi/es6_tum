import _ from 'lodash';

export default class {
  constructor(game, grid, name, color, keyMappings, moveInterval = 500, direction = "up") {
    this.game = game;
    this.grid = grid;
    this.name = name;
    this.color = color;
    this.moveInterval = moveInterval;
    this.direction = direction;
    this.keyMappings = keyMappings;

    this.positions = [grid.getRandomCell()];
    this.collectedFoodPos = [];
  }

  startMoving() {
    this.updatePos();
  }

  updateInput(event) {
    const moveDir = this.keyMappings[event.keyCode]; // get the move direction that is mapped to the pressed key
    if (moveDir) {
      // can't start moving in opposite direction
      if (moveDir === "up"    && this.direction === "down" ||
          moveDir === "right" && this.direction === "left" ||
          moveDir === "down"  && this.direction === "up" ||
          moveDir === "left"  && this.direction === "right") {
        return;
      }

      this.direction = moveDir;
    }
  }

  getHead() { return this.positions[0]; }

  updatePos() {
    this.move(this.direction);

    this.checkFoodCollision();
    this.checkSnakeCollision();

    this.moveTimer = setTimeout(this.updatePos.bind(this), this.moveInterval);
  }

  checkFoodCollision() {
    const foodPos = this.game.food.position;
    if (this.getHead().x === foodPos.x &&
        this.getHead().y === foodPos.y) {
      this.collectedFoodPos.push({x: foodPos.x, y: foodPos.y });
      this.game.food.respawn();
    }
  }

  checkSnakeCollision() {
    const head = this.getHead();

    this.game.players.forEach(player => {
      const tail = _.tail(player.positions);
      tail.forEach(elPos => {
        if (head.x === elPos.x && head.y === elPos.y) { // collision detected
          alert(`${this.name} collided with ${player.name}`);
          //TODO: reset game
        }
      })
    });
  }

  move(direction) {
    // inserts new element in move direction at the start of the positions list and removes the last element
    // snake moves through walls and comes out at other side

    switch(direction) {
      case "up":
        if (this.getHead().y === 0) { // will move into wall
          this.positions.unshift({ x: this.getHead().x, y: this.grid.cellsY - 1 }) // move to bottom wall
        } else {
          this.positions.unshift({ x: this.getHead().x, y: this.getHead().y - 1 }) // move up
        }
        break;

      case "right":
        if (this.getHead().x === this.grid.cellsX - 1) { // will move into wall
          this.positions.unshift({ x: 0, y: this.getHead().y }) // move to left wall
        } else {
          this.positions.unshift({ x: this.getHead().x + 1, y: this.getHead().y }) // move right
        }
        break;

      case "down":
        if (this.getHead().y === this.grid.cellsY) { // will move into wall
          this.positions.unshift({ x: this.getHead().x, y: 0 }) // move to top wall
        } else {
          this.positions.unshift({ x: this.getHead().x, y: this.getHead().y + 1 }) // move down
        }
        break;

      case "left":
        if (this.getHead().x === 0) { // will move into wall
          this.positions.unshift({ x: this.grid.cellsX - 1, y: this.getHead().y }) // move to left wall
        } else {
          this.positions.unshift({ x: this.getHead().x - 1, y: this.getHead().y }) // move left
        }
        break;
    }

    // only remove last element if no new food has been collected at its position
    const lastPos = this.positions[this.positions.length - 1];
    const lastFoodPos = this.collectedFoodPos[this.collectedFoodPos.length -1];
    if (lastFoodPos &&
        lastPos.x === lastFoodPos.x &&
        lastPos.y === lastFoodPos.y) {
      this.collectedFoodPos.pop();
    } else {
      this.positions.pop();
    }
  }

  draw(ctx) {
    this.positions.forEach(pos => {
      const pixelPos = this.grid.cellPosToPixelPos(pos);

      ctx.fillStyle = this.color;
      ctx.fillRect(pixelPos.x, pixelPos.y, this.grid.cellWidth, this.grid.cellHeight);
    });
  }
}
