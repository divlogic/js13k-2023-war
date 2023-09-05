import { SpriteClass, degToRad, movePoint } from 'kontra';

export class Helmet extends SpriteClass {
  radius: number;

  constructor(properties: any = {}) {
    super(properties);
    this.radius = properties.radius ?? 2;
  }

  draw(): void {
    this.drawBezier('right');
    this.drawBezier('left');
  }

  drawBezier(side: string): void {
    let yModifier;
    let xModifier;
    if (side === 'right') {
      yModifier = 1;
    } else if (side === 'left') {
      yModifier = -1;
    }

    if (this.context != null) {
      const context = this.context;
      const start = degToRad(40);
      const end = degToRad(320);
      const radius = 12;

      context.strokeStyle = 'black';
      context.beginPath();
      const startPoint = movePoint({ x: 0, y: 0 }, start, 3);
      const endPoint = movePoint({ x: 0, y: 0 }, end, 3);

      context.moveTo(startPoint.x, startPoint.y);
      context.arc(0, 0, radius, start, end);
      context.lineTo(endPoint.x, endPoint.y);
      context.lineTo(startPoint.x, startPoint.y);

      context.stroke();
    }
  }
}
