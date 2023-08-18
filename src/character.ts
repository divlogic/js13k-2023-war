import kontra, { Sprite } from 'kontra'
import SpriteState from './SpriteState'

interface Character extends Sprite {}

export function createCharacter(
  sprites: SpriteState,
  params?: Character
): Character {
  const defaults = {
    type: 'character',
    x: 300,
    y: 300,
    radius: 6,
    dt: 0,
    render(this: Sprite) {
      if (this.context != null) {
        // White triangle
        this.context.strokeStyle = 'white'
        this.context.beginPath()
        this.context.moveTo(-3, -5)
        this.context.lineTo(12, 0)
        this.context.lineTo(-3, 5)
        this.context.closePath()
        this.context.stroke()
      }
    },
    update(this: Sprite) {
      if (this.rotation != null) {
        if (kontra.keyPressed(['arrowleft', 'a'])) {
          this.rotation = this.rotation + kontra.degToRad(-4)
        } else if (kontra.keyPressed(['arrowright', 'd'])) {
          this.rotation = this.rotation + kontra.degToRad(4)
        }
        const cos = Math.cos(this.rotation)
        const sin = Math.sin(this.rotation)

        if (kontra.keyPressed(['arrowkeyup', 'w'])) {
          this.ddx = cos * 0.05
          this.ddy = sin * 0.05
        } else if (kontra.keyPressed(['arrowkeydown', 's'])) {
          this.ddx = cos * -0.05
          this.ddy = sin * -0.05
        } else {
          this.ddx = 0
          this.ddy = 0
        }

        this.advance()
        if (this.velocity.length() > 5) {
          if (this.dx != null) this.dx *= 0.95
          if (this.dy != null) this.dy *= 0.95
        }
        this.dt = (this.dt as number) + 1 / 60
        if (kontra.keyPressed('space') && this.dt > 0.25) {
          this.dt = 0

          if (
            typeof this.x === 'number' &&
            typeof this.y === 'number' &&
            typeof this.dx === 'number' &&
            typeof this.dy === 'number'
          ) {
            const bullet = Sprite({
              type: 'bullet',
              color: 'white',
              x: this.x + cos * 12,
              y: this.y + sin * 12,
              dx: this.dx + cos * 5,
              dy: this.dy + sin * 5,
              //   ttl: 50,
              radius: 2,
              width: 2,
              height: 2,
            })

            sprites.push(bullet)
          }
        }
      }
    },
  }
  const updated = Object.assign(defaults, params)

  const character = Sprite(updated)
  return character
}
