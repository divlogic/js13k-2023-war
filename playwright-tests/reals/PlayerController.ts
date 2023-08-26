import type { Page } from '@playwright/test';
import { getSprites } from '../utils';

export default class PlayerController {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async grabPosition(): Promise<unknown> {
    console.log('grabbing position');
    let position = null;
    position = (await getSprites(this.page)).data[0].position;
    // console.log('position is: ', position)
    return position;
  }

  async moveUp(): Promise<void> {
    await this.page.keyboard.press('w', { delay: 100 });
  }

  async moveDown(): Promise<void> {
    await this.page.keyboard.press('s');
  }

  async moveLeft(): Promise<void> {
    await this.page.keyboard.press('a');
  }

  async moveRight(): Promise<void> {
    await this.page.keyboard.press('d');
  }
}
