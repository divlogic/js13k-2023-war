import { type Sprite, Quadtree } from 'kontra';

// I may wish to use a Pool with pool.getAliveObjects()
// instead of the array method I'm doing now.
export default class SpriteState {
  data: Sprite[];
  quadTree: Quadtree;
  constructor(initialSprites: Sprite[] = []) {
    this.data = initialSprites;
    this.quadTree = Quadtree();
  }

  filter(callback: (sprite: Sprite) => boolean): void {
    this.data = this.data.filter(callback);
  }

  forEach(callback: (sprite: Sprite) => void): void {
    this.data.forEach(callback);
  }

  push(sprite: Sprite): void {
    this.data.push(sprite);
    this.quadTree.add(sprite);
    if (import.meta.env.DEV) {
      window.sprites = this;
    }
  }

  get(index: number): Sprite {
    const sprite = this.data[index];
    return sprite;
  }

  length(): number {
    return this.data.length;
  }

  refresh(): void {
    this.quadTree.clear();
    this.quadTree.add(this.data);
  }
}
