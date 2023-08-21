import kontra, { Sprite, init, GameLoop, initPointer, onKey } from 'kontra'
import SpriteState from './SpriteState'
import { createCharacter } from './character'
import { detectCollisions, handleBounds } from './collisionDetection'

const { canvas } = init()

kontra.initKeys()
initPointer()

const sprites = new SpriteState()

// const ship = Character.create(sprites)/
const ship = createCharacter(sprites, {})

sprites.push(ship)

// export function createAsteroid(x: number, y: number, radius: number): void {
//   const asteroid = Sprite({
//     type: 'asteroid',
//     x,
//     y,
//     radius,
//     // dx: Math.random() * 4 - 2,
//     // dy: Math.random() * 4 - 2,
//     dx: 0,
//     dy: 0,

//     render() {
//       if (this.context != null) {
//         this.context.strokeStyle = 'white'
//         this.context.beginPath()
//         this.context.arc(0, 0, this.radius, 0, Math.PI * 2)
//         this.context.stroke()
//       }
//     },
//   })
//   sprites.push(asteroid)
// }

// for (let i = 0; i < 1; i++) {
//   createAsteroid(300, 100, 30)
// }

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
