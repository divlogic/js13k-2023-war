import { expect, test } from '@playwright/test';
import { getObject } from './utils';

test.describe('Given that an HQ building exists', async () => {
  test('If it has a team, it should spawn units', async ({ page }) => {
    await page.goto('localhost:5173?scenario=buildingHq');
    const startSprites = await getObject(page, 'sprites');
    expect(startSprites.length).toBe(0);

    const hq = await getObject(page, 'hq');

    expect(hq).toBeDefined();
    // Arbitrary team color
    expect(hq.team).toBe('green');

    await page.waitForTimeout(3000);

    await expect
      .poll(
        async () => {
          const sprites = await getObject(page, 'sprites');
          return sprites.length();
        },
        {
          message: 'There should be more sprites after some time',
          timeout: 5000,
        }
      )
      .toBeGreaterThan(0);
    const endSprites = await getObject(page, 'sprites');
    endSprites.forEach((element) => {
      // Sprites should be the same team as their HQ's
      expect(element.team).toBe('green');
    });
  });
});
