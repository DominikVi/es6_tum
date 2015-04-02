require.config({
  baseUrl: '/js',
  paths: {
    lodash: '/lib/lodash/lodash',
  }
});

require(["Game"], function(Game) {
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 800;
  canvas.height = 800;

  const context = canvas.getContext("2d");

  const game = new Game(canvas, 40, 40);
  game.start();

  function gameLoop(timestamp) {
    game.draw(context);

    window.addEventListener('keyup', game.updateInput.bind(game));
    window.requestAnimationFrame(gameLoop);
  }

  window.requestAnimationFrame(gameLoop);
});
