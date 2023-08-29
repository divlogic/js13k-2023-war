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
import { Weapon } from '../../src/weapon';
import { NPC } from '../../src/npc';
declare global {
  interface Window {
    sprites: any;
    player: Character;
    enemy: NPC;
  }
}

export function npcBehaviorScene() {
  const { canvas } = init();

  kontra.initKeys();
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

  const enemy = new NPC({ x: 0, y: 0, moveSpeed: 3 });
  window.enemy = enemy;
  sprites.push(enemy);

  enemy.addTarget(player);

  // This is taken from the example, might be a bug in their type file
  // @ts-ignore
  let pool = Pool({ create: Sprite });

  const fireLance = new Weapon({
    pool,
    sprites,
    projectileWeapon: true,
    types: 'firelance',
    x: 5,
    y: 5,
    render(this: Sprite) {
      if (this.context != null) {
        this.context.fillStyle = 'brown';
        this.context.beginPath();
        this.context.fillRect(0, 0, 15, 2);
        this.context.fillStyle = 'green';
        this.context.fillRect(15, 0, 8, 4);
        this.context.stroke();
      }
    },
  });
  player.addChild(fireLance);

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
