import { Sprite } from 'kontra';

export function createArmorPlate(radius: number) {
  return Sprite({
    render() {
      this.drawBezier('right');
      this.drawBezier('left');
    },
    drawBezier(side: string) {
      let yModifier;
      let xModifier;
      if (side === 'right') {
        yModifier = 1;
      } else if (side === 'left') {
        yModifier = -1;
      }

      if (this.context != null) {
        const context = this.context;
        context.moveTo(0, 0);
        context.beginPath();
        context.strokeStyle = 'grey';
        context.arc(0, 0, 2, 0, 2 * Math.PI);
        context.stroke();
        context.strokeStyle = 'black';
        context.beginPath();

        const x = -1 * radius;
        const y = 2 * yModifier * radius;
        const x2 = radius;
        const y2 = 2 * yModifier * radius;

        context.moveTo(x, y);

        context.beginPath();
        context.arc(x, y, 1, 0, 2 * Math.PI);
        context.strokeStyle = 'orange';
        context.stroke();
        context.beginPath();

        context.strokeStyle = 'black';

        context.moveTo(x, y);
        context.bezierCurveTo(
          x,
          y + yModifier * radius,
          x2,
          y2 + yModifier * radius,
          x2,
          y2
        );

        const yOffset = 0.8 * radius * yModifier;
        context.lineTo(x2, y2 + yOffset);
        context.bezierCurveTo(
          x2,
          y2 + yOffset + 0.5 * yModifier * radius,
          x,
          y + yOffset + 0.5 * yModifier * radius,
          x,
          y + yOffset
        );
        context.closePath();

        context.stroke();

        context.beginPath();
        context.arc(x2, y2, 1, 0, 2 * Math.PI);
        context.strokeStyle = 'green';
        context.stroke();
        context.beginPath();
      }
    },
  });
}
