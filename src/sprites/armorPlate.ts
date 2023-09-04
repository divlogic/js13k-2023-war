import { SpriteClass } from 'kontra';
import { Character } from '../character';

export function addArmorPlates(character: Character) {
  if (!Object.hasOwn(character, 'armor')) {
    console.log('does not have own');
    character.armor = [];
  }
  let radius = 0;
  if (character?.armor.length > 0) {
    radius = character.armor.slice(-1)[0].radius + 1;
    console.log(character.armor.slice(-1));
  } else {
    radius = character.radius;
  }
  console.log('radius is: ', radius);
  const armorPlate = createArmorPlate(radius);
  character.addChild(armorPlate);
  character.armor.push(armorPlate);
}
export function createArmorPlate(radius: number) {
  return new ArmorPlate({ radius });
}
export class ArmorPlate extends SpriteClass {
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
      context.moveTo(0, 0);
      context.beginPath();
      context.strokeStyle = 'grey';
      context.arc(0, 0, 2, 0, 2 * Math.PI);
      context.stroke();
      context.strokeStyle = 'black';
      context.beginPath();

      const x = -1 * this.radius;
      const y = 2 * yModifier * this.radius;
      const x2 = this.radius;
      const y2 = 2 * yModifier * this.radius;

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
        y + yModifier * this.radius,
        x2,
        y2 + yModifier * this.radius,
        x2,
        y2
      );

      const yOffset = 0.8 * this.radius * yModifier;
      context.lineTo(x2, y2 + yOffset);
      context.bezierCurveTo(
        x2,
        y2 + yOffset + 0.5 * yModifier * this.radius,
        x,
        y + yOffset + 0.5 * yModifier * this.radius,
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
  }
}
