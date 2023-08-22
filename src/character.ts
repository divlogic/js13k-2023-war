import kontra, { Sprite, angleToTarget, getPointer } from 'kontra'

export function createCharacter() {
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
      }
    },
  }

  const character = Sprite(defaults)
  return character
}
