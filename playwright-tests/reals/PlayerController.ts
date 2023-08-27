import type { Page } from '@playwright/test';
import { getObject, getSprites } from '../utils';
import type { CoordModel } from '../models/models';

export default class PlayerController {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async grabPosition(): Promise<CoordModel> {
    const sprite = await getObject(this.page, 'player');
    const position: CoordModel = {
      x: sprite.position._x,
      y: sprite.position._y,
    };
    return position;
  }

  async moveUp(): Promise<void> {
    await this.page.keyboard.press('w', { delay: 100 });
  }

  async moveDown(): Promise<void> {
    await this.page.keyboard.press('s', { delay: 100 });
  }

  async moveLeft(): Promise<void> {
    await this.page.keyboard.press('a', { delay: 100 });
  }

  async moveRight(): Promise<void> {
    await this.page.keyboard.press('d', { delay: 100 });
  }
}
