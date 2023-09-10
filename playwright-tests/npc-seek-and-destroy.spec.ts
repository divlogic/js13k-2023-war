import { test, expect } from '@playwright/test';

test.describe('NPC will default to seek and destroy mode', async () => {
  test('Seek and destroy will make them move towards enemy buildings', async ({
    page,
  }) => {
    await page.goto('localhost:5173?scenario=npcSeekAndDestroy');
    await page.waitForTimeout(1000);

    const blueSprite = await page.evaluate(() => {
      return window.sprites.data.find((sprite) => {
        return sprite.color === 'blue';
      });
    });

    expect(blueSprite?.target).toBeDefined();
    expect(blueSprite?.target?.type).toBe('spawner');
  });
});
