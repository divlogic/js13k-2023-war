import { Sprite, SpriteClass, degToRad, movePoint, randInt } from 'kontra';

export class Helmet extends SpriteClass {
  radius: number;

  constructor(properties: any = {}) {
    super(properties);
    this.radius = properties.radius ?? 2;
    // This whole accessories thing is intended to be a plume
    const accessories = [];
    console.log('constructor');
    for (let i = 0; i < randInt(20, 25); i++) {
      const startX = 0;
      const startY = 0;
      const endX = randInt(-30, -15);
      const endY = randInt(-10, 10);
      const cp1x = -2;
      const cp1y = 0;
      const cp2x = endX;
      const cp2y = 0;
      accessories.push(
        Sprite({
          render() {
            this.draw();
            if (this.context != null) {
              const context = this.context;
              context.moveTo(startX, startY);
              context.beginPath();
              context.strokeStyle = 'blue';
              context.arc(cp1x, cp1y, 1, 0, 2 * Math.PI);
              context.stroke();
              context.fill();

              context.moveTo(endX, endY);
              context.beginPath();
              context.strokeStyle = 'green';
              context.arc(cp2x, cp2y, 1, 0, 2 * Math.PI);
              context.stroke();
              context.fill();

              context.strokeStyle = 'red';
              context.moveTo(startX, startY);
              context.beginPath();
              context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
              context.stroke();
            }
          },
        })
      );
    }
    console.log('accessories.length is: ', accessories.length);
    this.addChild(accessories);
  }

  draw(): void {
    super.draw();

    this.drawHelmet();
    // this.drawAccessories();
    // this.drawAccessories();
    // this.drawAccessories();
    // this.drawAccessories();
  }

  drawHelmet(): void {
    if (this.context != null) {
      const context = this.context;
      const start = degToRad(40);
      const end = degToRad(320);
      const radius = 12;

      context.strokeStyle = 'black';
      context.beginPath();
      const startPoint = movePoint({ x: 0, y: 0 }, start, 5);
      const endPoint = movePoint({ x: 0, y: 0 }, end, 5);

      context.moveTo(startPoint.x, startPoint.y);
      context.arc(0, 0, radius, start, end);
      context.lineTo(endPoint.x, endPoint.y);
      context.lineTo(startPoint.x, startPoint.y);
      context.stroke();
    }
  }
}
