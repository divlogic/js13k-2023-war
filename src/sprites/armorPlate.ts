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
        const x = -1 * radius;
        const y = -2 * radius;
        context.moveTo(x, y);
        context.beginPath();
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

        const offset = 5;
        context.lineTo(x2, y2 + offset);
        context.bezierCurveTo(
          x2,
          y2 + offset - (1 / 2) * radius,
          x,
          y + offset - (1 / 2) * radius,
          x,
          y + offset
        );
        context.closePath();

        context.stroke();
      }
    },
  });
}
