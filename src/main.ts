import kontra, {
  Sprite,
  init,
  GameLoop,
  initPointer,
  onKey,
  Pool,
} from 'kontra'
import SpriteState from './SpriteState'
import { Character } from './character'
import { detectCollisions, handleBounds } from './collisionDetection'
import { Weapon } from './weapon'
declare global {
  interface Window {
    sprites: any
  }
}

const { canvas } = init()

kontra.initKeys()
initPointer()

const sprites = new SpriteState()

const ship = new Character({ x: 300, y: 300, player: true, team: 'blue' })

sprites.push(ship)

const enemy = new Character({ x: 400, y: 200, moveSpeed: 1 })
sprites.push(enemy)

// This is taken from the example, might be a bug in their type file
// @ts-ignore
let pool = Pool({ create: Sprite })

const fireLance = new Weapon({
  pool,
  sprites,
  projectileWeapon: true,
  types: 'firelance',
  x: 5,
  y: 5,
  render(this: Sprite) {
    if (this.context != null) {
      this.context.fillStyle = 'brown'
      this.context.beginPath()
      this.context.fillRect(0, 0, 15, 2)
      this.context.fillStyle = 'green'
      this.context.fillRect(15, 0, 8, 4)
      this.context.stroke()
    }
  },
})
// This handles the positioning and visual aspect,
// but it doesn't seem to address other relational aspects.
ship.addChild(fireLance)

const loop = GameLoop({
  // fps: 1,
  update: function (this: GameLoop) {
    sprites.refresh()
    sprites.forEach((sprite) => {
      handleBounds(sprite, canvas)
    })

    // collision detection
    detectCollisions(sprites)

    sprites.filter((sprite) => sprite.isAlive())
  },
  render: function () {
    sprites.forEach((sprite) => {
      sprite.render()
    })
  },
})

onKey('esc', () => {
  if (loop.isStopped) {
    loop.start()
  } else {
    loop.stop()
  }
})
loop.start()
