import { Sprite } from 'kontra';

export function createArmorPlate(radius: number) {
  return Sprite({
    render() {
      this.drawBezier();
    },
    drawBezier() {
      if (this.context != null) {
        const context = this.context;
        context.strokeStyle = 'black';
        context.beginPath();
        context.moveTo(-1 * radius, -2 * radius);
        context.stroke();
        context.beginPath();
        const x = -1 * radius;
        const y = -2 * radius;
        context.moveTo(x, y);
        const x2 = radius;
        const y2 = -2 * radius;
        context.bezierCurveTo(
          x,
          y - (1 / 2) * radius,
          x2,
          y2 - (1 / 2) * radius,
          x2,
          y2
        );
        context.stroke();
      }
    },
  });
}
