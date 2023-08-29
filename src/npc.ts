import { Character } from './character';

export class NPC extends Character {
  // target: null | Character = null

  addTarget(character: Character) {
    this.target = character;
  }

  moveToCoords(x: number, y: number) {
    const xDifference = this.x - x;
    const yDifference = this.y - y;
    if (xDifference > 0) {
      this.moveLeft();
    } else if (xDifference < 0) {
      this.moveRight();
    }
    if (yDifference > 0) {
      this.moveUp();
    } else if (yDifference < 0) {
      this.moveDown();
    }
  }

  update(dt?: number | undefined): void {
    if (this.target) {
      this.moveToCoords(this.target.x, this.target.y);
    }
    super.update(dt);
  }
}
