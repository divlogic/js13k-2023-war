import kontra, {
  Sprite,
  init,
  GameLoop,
  initPointer,
  onKey,
  Pool,
} from 'kontra';
import SpriteState from '../../src/SpriteState';
import { Character } from '../../src/character';
import { detectCollisions, handleBounds } from '../../src/collisionDetection';
import { NPC } from '../../src/npc';
import firelance from '../../src/weapons/firelance';
declare global {
  interface Window {
    player: Character;
    enemy: NPC;
  }
}

export function npcBehavior(): void {
  const { canvas } = init();

  kontra.initKeys();
  initPointer();

  const sprites = new SpriteState();

  const player = new Character({
    x: 300,
    y: 300,
    player: true,
    team: 'blue',
    radius: 10,
  });
  window.player = player;

  sprites.push(player);

  const enemy = new NPC({ x: 1, y: 1, moveSpeed: 3, radius: 10 });
  window.enemy = enemy;
  sprites.push(enemy);

  enemy.addTarget(player);

  // This is taken from the example, might be a bug in their type file
  // @ts-expect-error This seems like the type file is off
  const pool = Pool({ create: Sprite });

  const weapon = firelance(pool, sprites);
  player.addWeapon(weapon);

  enemy.addWeapon(firelance(pool, sprites));

  const loop = GameLoop({
    // fps: 1,
    update: function (this: GameLoop, dt: number) {
      sprites.refresh();
      sprites.forEach((sprite) => {
        handleBounds(sprite, canvas, dt);
      });

      // collision detection
      detectCollisions(sprites);

      pool.update(dt);
      sprites.scene.update(dt);
      sprites.clearDead();
    },
    render: function () {
      sprites.scene.render();
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
