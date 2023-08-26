import type fc from 'fast-check';
import type { CoordModel } from '../models/models';
import type PlayerController from '../reals/PlayerController';
import type { Page } from '@playwright/test';

export default class MoveUp
  implements fc.AsyncCommand<CoordModel, PlayerController, true>
{
  coords?: CoordModel;
  count = 0;
  page: Page;

  constructor(page: Page, coords: CoordModel) {
    this.coords = coords;
    this.page = page;
  }

  async check(): Promise<boolean> {
    return true;
  }

  async run(model: CoordModel, real: PlayerController): Promise<void> {
    this.count += 1;
    console.log(this.count);
    await real.moveUp();
    // console.log('model is: ', model)
    const newCoords = await real.grabPosition();
    console.log('newCoords: ', newCoords);
  }

  toString(): string {
    return `Moving up coords: ${JSON.stringify(this.coords)}`;
  }
}
