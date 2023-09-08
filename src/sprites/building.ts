import {
  type Sprite,
  SpriteClass,
  angleToTarget,
  getPointer,
  keyPressed,
  type SpriteConstructor,
} from 'kontra';
import type { ArmorPlate } from './armorPlate';
import { Helmet } from './helmet';
import type { Weapon } from '../weapon';

export type SpriteProps = ConstructorParameters<SpriteConstructor>['0'];

type BuildingProperties = SpriteProps & {
  team?: string;
  moveSpeed?: number;
  player?: boolean;
  radius?: number;
  helmet?: Helmet;
};

export class Building extends SpriteClass {
  team: string;
  radius: number;
  armor: ArmorPlate[] = [];
  weapon?: Weapon;

  constructor(properties: BuildingProperties) {
    super(properties);
    this.team = properties.team ?? 'red';
    this.radius = properties.radius ?? 10;

    if (this.type === undefined || this.type === null) {
      this.type = properties.type ?? 'building';
    }
  }

  draw(this: Sprite): void {
    if (this.context != null) {
      // Color can be changed later
      this.context.strokeStyle = this.team;
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.context.stroke();
      this.context.fillStyle = this.team;
      this.context.fill();
    }
  }

  update(dt?: number | undefined): void {
    super.update(dt);
  }
}
