import * as Grid from 'classes/Grid';

export function init() {
  const GRID_WIDTH = 500,
        GRID_HEIGHT = 500,
        CELLS_X = 20,
        CELLS_Y = 20;

  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = GRID_WIDTH;
  canvas.height = GRID_HEIGHT;

  const ctx = canvas.getContext("2d");

  const grid = new Grid(GRID_WIDTH, GRID_HEIGHT, CELLS_X, CELLS_Y)

  grid.render(ctx);

}
