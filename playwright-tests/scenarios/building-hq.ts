import { Sprite, init, GameLoop, initPointer, onKey, initKeys } from 'kontra';
import SpriteState from '../../src/SpriteState';
import { detectCollisions, handleBounds } from '../../src/collisionDetection';
import { Building } from '../../src/sprites/building';
declare global {
  interface Window {
    sprites: any;
    hq: any;
  }
}

export function buildingHq(): void {
  const { canvas } = init();
  initKeys();
  initPointer();
  const sprites = new SpriteState();
  window.sprites = sprites;
  const hq = new Building({ team: 'green', x: 200, y: 200 });
  window.hq = hq;
  sprites.push(hq);

  const loop = GameLoop({
    update: function (this: GameLoop) {
      sprites.refresh();
      sprites.forEach((sprite) => {
        handleBounds(sprite, canvas);
      });

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
