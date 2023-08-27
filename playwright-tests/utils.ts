import { Page } from '@playwright/test';

export async function getSprites(page: Page) {
  const spritesHandle = await page.evaluateHandle(() => {
    return window.sprites;
  });

  return await spritesHandle.jsonValue();
}

export async function getObject(page: Page, key: string): any {
  const obj = await page.evaluate('window.' + key);

  return obj;
}

export class ValueChangeTracker {
  values: number[] = [];
  correctDirection: boolean = false;

  getterFunction(callback) {
    this.values.push(callback());
  }
  runCalculations(operator: string) {
    return this.values.reduceRight((previous, current, currentIndex, arr) => {
      if (currentIndex === arr.length - 1) {
      }
      if (previous <= current) {
        return current;
      }
    });
  }
}
