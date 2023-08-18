import { Sprite } from 'kontra'

export default class SpriteState {
  data: Sprite[]
  constructor(initialSprites: Sprite[] = []) {
    this.data = initialSprites
  }

  filter(callback: (sprite: Sprite) => any) {
    this.data = this.data.filter(callback)
  }

  forEach(callback: (sprite: Sprite) => any) {
    this.data.forEach(callback)
  }

  push(sprite: Sprite): void {
    this.data.push(sprite)
  }

  get(index: number) {
    return this.data[index]
  }

  length(): number {
    return this.data.length
  }
}
