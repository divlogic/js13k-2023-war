import kontra, { Sprite, init, GameLoop, initPointer, onKey } from 'kontra'
import SpriteState from './SpriteState'
import { createCharacter } from './character'

const { canvas } = init()

kontra.initKeys()
initPointer()

const sprites = new SpriteState()

const ship = createCharacter(sprites)

sprites.push(ship)

function createAsteroid(x: number, y: number, radius: number): void {
  const asteroid = Sprite({
    type: 'asteroid',
    x,
    y,
    radius,
    // dx: Math.random() * 4 - 2,
    // dy: Math.random() * 4 - 2,
    dx: 1,
    dy: 0,

    render() {
      if (this.context != null) {
        this.context.strokeStyle = 'white'
        this.context.beginPath()
        this.context.arc(0, 0, this.radius, 0, Math.PI * 2)
        this.context.stroke()
      }
    },
  })
  sprites.push(asteroid)
}

for (let i = 0; i < 1; i++) {
  createAsteroid(100, 100, 30)
}

const loop = GameLoop({
  update: function (this: GameLoop) {
    sprites.refresh()
    sprites.forEach((sprite) => {
      // sprite is beyond the left edge
      const radius: number = sprite.radius
      if (sprite.x < -radius) {
        sprite.x = canvas.width + radius
      } else if (sprite.x > canvas.width + radius) {
        // sprite is beyond the right edge
        sprite.x = 0 - radius
      }
      // sprite is beyond the top edge
      if (sprite.y < -radius) {
        sprite.y = canvas.height + radius
      } else if (sprite.y > canvas.height + radius) {
        // sprite is beyond the bottom edge
        sprite.y = -radius
      }
      sprite.update()
    })

    // collision detection
    for (let i = 0; i < sprites.length(); i++) {
      if (sprites.get(i).type === 'asteroid') {
        for (let j = 0; j < sprites.length(); j++) {
          if (sprites.get(j).type !== 'asteroid') {
            let asteroid = sprites.get(i)
            let sprite = sprites.get(j)
            let dx = asteroid.x - sprite.y
            let dy = asteroid.y - sprite.y
            if (Math.hypot(dx, dy) < asteroid.radius + sprite.radius) {
              asteroid.ttl = 0
              sprite.ttl = 0

              if (asteroid.radius > 10) {
                for (var x = 0; x < 3; x++) {
                  createAsteroid(asteroid.x, asteroid.y, asteroid.radius / 2.5)
                }
              }

              break
            }
          }
        }
      }
    }

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
