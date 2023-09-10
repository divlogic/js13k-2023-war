import { test, expect } from '@playwright/test';

test.describe('NPC will default to seek and destroy mode', async () => {
  test('Seek and destroy will make them move towards enemy buildings', async ({
    page,
  }) => {
    await page.goto('localhost:5173?scenario=npcSeekAndDestroy');

    const blueSprite = await page.evaluate('window.blueSprite');
    expect(blueSprite.position._x).toBe(1);
    expect(blueSprite.position._y).toBe(500);

    await page.waitForTimeout(1000);
    const updatedBlueSprite = await page.evaluate('window.blueSprite');
    expect(updatedBlueSprite?.target).toBeDefined();
    expect(updatedBlueSprite?.target?.type).toBe('spawner');
    expect(updatedBlueSprite?.mode).toBe('seekAndDestroy');
    // They are positioned diagonally apart to start
    // This will indicate the sprite has moved closer
    expect(updatedBlueSprite?.position?._x).toBeGreaterThan(300);
    expect(updatedBlueSprite?.position?._y).toBeLessThan(300);
  });
});
