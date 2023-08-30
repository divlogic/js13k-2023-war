import {
  type Sprite,
  SpriteClass,
  angleToTarget,
  getPointer,
  keyPressed,
} from 'kontra';

export class Character extends SpriteClass {
  type = 'character';
  team: string;
  moveSpeed: number;
  player: boolean;
  radius: number;

  constructor(properties: any = {}) {
    super(properties);
    this.moveSpeed = properties.moveSpeed ?? 5;
    this.player = properties.player ?? false;
    this.team = properties.team ?? 'red';
    if (this.radius === undefined || this.radius === null) {
      this.radius = properties.radius ?? 2;
    }
  }

  draw(this: Sprite) {
    if (this.context != null) {
      // Color can be changed later
      this.context.strokeStyle = this.team;
      this.context.beginPath();
      this.context.moveTo(-3, -5);
      this.context.lineTo(12, 0);
      this.context.lineTo(-3, 5);
      this.context.closePath();
      this.context.stroke();
    }
  }

  update(dt?: number | undefined): void {
    super.update(dt);
    if (this.player) {
      const pointer = getPointer();

      const angle = angleToTarget(this, pointer);
      this.rotation = angle;
      if (this.rotation != null) {
        this.handleKeys();

        if (this.x === this.context.canvas.width) {
          this.ddx = 0;
        }
        if (this.y === this.context.canvas.height) {
          this.ddy = 0;
        }

        this.advance();
        if (this.velocity.length() > 5) {
          if (this.dx != null) this.dx *= 0.95;
          if (this.dy != null) this.dy *= 0.95;
        }
        this.dt = (this.dt as number) + 1 / 60;
      }
    }
  }

  handleKeys() {
    if (keyPressed(['arrowleft', 'a'])) {
      this.moveLeft();
    } else if (keyPressed(['arrowright', 'd'])) {
      this.moveRight();
    }

    if (keyPressed(['arrowup', 'w'])) {
      this.moveUp();
    } else if (keyPressed(['arrowdown', 's'])) {
      this.moveDown();
    }
  }

  moveLeft() {
    this.x = this.x - this.moveSpeed;
  }

  moveRight() {
    this.x = this.x + this.moveSpeed;
  }

  moveUp() {
    this.y = this.y - this.moveSpeed;
  }

  moveDown() {
    this.y = this.y + this.moveSpeed;
  }
}
