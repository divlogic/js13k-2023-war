import {
  Sprite,
  init,
  GameLoop,
  initPointer,
  onKey,
  Pool,
  initKeys,
} from 'kontra';
import SpriteState from '../SpriteState';
import { Character } from '../character';
import { detectCollisions, handleBounds } from '../collisionDetection';
import { Weapon } from '../weapon';
import { NPC } from '../npc';
import firelance from '../weapons/firelance';
declare global {
  interface Window {
    sprites: any;
  }
}

export function createScenario() {
  const { canvas } = init();

  initKeys();
  initPointer();

  const sprites = new SpriteState();

  const ship = new Character({
    x: 300,
    y: 300,
    player: true,
    team: 'blue',
  });

  sprites.push(ship);

  const enemy = new NPC({ x: 400, y: 200, moveSpeed: 1 });
  sprites.push(enemy);

  // This is taken from the example, might be a bug in their type file
  // @ts-ignore
  let pool = Pool({ create: Sprite });

  const fireLance = firelance(pool, sprites);
  // This handles the positioning and visual aspect,
  // but it doesn't seem to address other relational aspects.
  console.log(ship);
  ship.addChild(fireLance);

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
