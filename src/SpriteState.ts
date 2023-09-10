import { type Sprite, Quadtree, type SceneClass, Scene } from 'kontra';

// I may wish to use a Pool with pool.getAliveObjects()
// instead of the array method I'm doing now.
export default class SpriteState {
  quadTree: Quadtree;
  scene: Scene;
  constructor(initialSprites: Sprite[] = [], scene?: Scene) {
    this.quadTree = Quadtree();
    this.scene = scene ?? Scene({ id: 'SpriteState' });
    this.scene.add(initialSprites);
  }

  forEach(callback: (sprite: Sprite) => void): void {
    this.scene.objects.forEach(callback);
  }

  push(sprite: Sprite): void {
    this.quadTree.add(sprite);
    if (sprite.type !== 'bullet') {
      this.scene.add(sprite);
    }

    if (import.meta.env.DEV) {
      window.sprites = this;
    }
  }

  get(index: number): Sprite {
    const sprite = this.scene.objects[index];
    return sprite;
  }

  length(): number {
    return this.scene.objects.length;
  }

  refresh(): void {
    this.quadTree.clear();
    this.quadTree.add(this.scene.objects);
  }

  clearDead(): void {
    this.scene.objects.forEach((obj) => {
      if (!obj.isAlive()) {
        this.scene.remove(obj);
      }
    });
  }
}
