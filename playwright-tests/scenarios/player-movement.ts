import { init, GameLoop, initPointer, onKey, initKeys } from 'kontra';
import SpriteState from '../../src/SpriteState';
import { Character } from '../../src/character';
import { detectCollisions, handleBounds } from '../../src/collisionDetection';
import { NPC } from '../../src/npc';
declare global {
  interface Window {
    player: Character;
  }
}

export function playerMovementScenario(): void {
  const { canvas } = init();

  initKeys();
  initPointer();

  const sprites = new SpriteState();

  const player = new Character({
    x: 300,
    y: 300,
    player: true,
    team: 'blue',
  });
  window.player = player;

  sprites.push(player);

  const enemy = new NPC({ x: 400, y: 200, moveSpeed: 1 });
  sprites.push(enemy);

  const loop = GameLoop({
    // fps: 1,
    update: function (this: GameLoop) {
      sprites.refresh();
      sprites.forEach((sprite) => {
        handleBounds(sprite, canvas);
      });
      // collision detection
      detectCollisions(sprites);

      sprites.filter((sprite) => sprite.isAlive());
    },
    render: function () {
      sprites.forEach((sprite) => {
        sprite.render();
      });
    },
  });

  onKey('esc', () => {
    if (loop.isStopped) {
      loop.start();
    } else {
      loop.stop();
    }
  });
  loop.start();
}
