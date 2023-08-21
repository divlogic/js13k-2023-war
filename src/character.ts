import kontra, { Sprite, angleToTarget, getPointer } from 'kontra'
import SpriteState from './SpriteState'

export function createCharacter(sprites: SpriteState) {
  const defaults = {
    type: 'character',
    x: 300,
    y: 300,
    radius: 6,
    dt: 0,
    moveSpeed: 4,
    rotation: kontra.degToRad(270),

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
      const pointer = getPointer()

      const angle = angleToTarget(this, pointer)
      this.rotation = angle
      if (this.rotation != null) {
        if (kontra.keyPressed(['arrowleft', 'a'])) {
          // this.rotation = this.rotation + kontra.degToRad(-4)
          this.x = this.x - this.moveSpeed
        } else if (kontra.keyPressed(['arrowright', 'd'])) {
          // this.rotation = this.rotation + kontra.degToRad(4)
          this.x = this.x + this.moveSpeed
        }
        const cos = Math.cos(this.rotation)
        const sin = Math.sin(this.rotation)

        if (kontra.keyPressed(['arrowup', 'w'])) {
          this.y = this.y - this.moveSpeed
        } else if (kontra.keyPressed(['arrowdown', 's'])) {
          this.y = this.y + this.moveSpeed
        }

        if (this.x === this.context.canvas.width) {
          this.ddx = 0
        }
        if (this.y === this.context.canvas.height) {
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
              ttl: 50,
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

  const character = Sprite(defaults)
  return character
}
