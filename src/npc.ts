import { Sprite, angleToTarget } from 'kontra';
import { Character } from './character';

export class NPC extends Character {
  target?: Character;

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
      const angle = angleToTarget(this, this.target);
      this.rotation = angle;
      this.moveToCoords(this.target.x, this.target.y);
      if (this.children.length > 0) {
        this.attack();
      }
      // TODO: something to detect range
      // TODO: something to attack when in range
      // Maybe slow movespeed down a bit while attacking?
    }
    super.update(dt);
  }

  attack() {
    this.children[0].attack();
  }
}
