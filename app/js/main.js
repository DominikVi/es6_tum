require.config({
  baseUrl: '/js'
});

require(["Game"], function(Game) {
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 500;
  canvas.height = 500;

  const context = canvas.getContext("2d");

  const game = new Game(canvas, 20, 20);

  function gameLoop(timestamp) {
    game.update(timestamp);
    game.draw(context);

    window.addEventListener('keyup', game.updateInput.bind(game));
    window.requestAnimationFrame(gameLoop);
  }

  window.requestAnimationFrame(gameLoop);
});
