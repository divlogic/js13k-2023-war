import { Character } from './character'

export class NPC extends Character {
  //

  moveToCoords(x: number, y: number) {
    const xDifference = this.x - x
    const yDifference = this.y - y
    if (xDifference > 0) {
      this.moveLeft()
    } else if (xDifference < 0) {
      this.moveRight()
    }
    if (yDifference > 0) {
      this.moveUp()
    } else if (yDifference < 0) {
      this.moveDown()
    }
  }

  update(dt?: number | undefined): void {
    this.moveToCoords(100, 100)
    super.update(dt)
  }
}
