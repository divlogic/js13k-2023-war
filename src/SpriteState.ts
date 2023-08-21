import { Sprite, Quadtree } from 'kontra'

export default class SpriteState {
  data: Sprite[]
  quadTree: Quadtree
  constructor(initialSprites: Sprite[] = []) {
    this.data = initialSprites
    this.quadTree = Quadtree()
  }

  filter(callback: (sprite: Sprite) => any) {
    this.data = this.data.filter(callback)
  }

  forEach(callback: (sprite: Sprite) => any) {
    this.data.forEach(callback)
  }

  push(sprite: Sprite): void {
    this.data.push(sprite)
    this.quadTree.add(sprite)
    if (import.meta.env.DEV) {
      window.sprites = this
    }
  }

  get(index: number) {
    const sprite = this.data[index]
    return sprite
  }

  length(): number {
    return this.data.length
  }
  refresh(): void {
    this.quadTree.clear()
    this.quadTree.add(this.data)
  }
}
