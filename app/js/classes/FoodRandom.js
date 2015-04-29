import Food from './Food';

export default class FoodRandom extends Food {
  constructor(game, grid, color, respawnProbability, respawnInterval = 5000) {
    super(game, grid, color, respawnInterval);

    this.respawnProbability = respawnProbability;
  }

  respawn() {
    // random food should not always be respawned
    if (Math.random() < this.respawnProbability) {
      super.respawn();
    } else {
      this.position = { x: -1, y: -1 }; // hide the food
      super.resetRespawn();
    }
  }
}
