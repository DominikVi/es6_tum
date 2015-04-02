require.config({
  baseUrl: '/js',
  paths: {
    lodash: '/lib/lodash/lodash',
  }
});

require(["Game"], function(Game) {
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 500;
  canvas.height = 500;

  const context = canvas.getContext("2d");

  const game = new Game(canvas, 20, 20);
  game.start();

  function gameLoop(timestamp) {
    game.draw(context);

    window.addEventListener('keyup', game.updateInput.bind(game));
    window.requestAnimationFrame(gameLoop);
  }

  window.requestAnimationFrame(gameLoop);
});
