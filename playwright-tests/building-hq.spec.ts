import { expect, test } from '@playwright/test';
import { getObject } from './utils';
import type SpriteState from '../src/SpriteState';
import type { Building } from '../src/sprites/building';
import type { Sprite, Vector } from 'kontra';

type Private<Type> = {
  [Property in keyof Type as `_${Property}`]: Type[Property];
};
type TestSprite = Sprite &
  Private<Sprite> & {
    position: Private<Vector>;
  };

test.describe('Given that an HQ building exists', async () => {
  test('If it has a team, it should spawn units', async ({ page }) => {
    await page.goto('localhost:5173?scenario=buildingHq', {
      waitUntil: 'load',
    });

    const startSprites = (await getObject(page, 'sprites')) as SpriteState;
    expect(startSprites.scene._o.length).toBe(1);

    await expect
      .poll(async () => {
        return await getObject(page, 'hq');
      })
      .toBeDefined();

    const hq = (await getObject(page, 'hq')) as Building;

    // Arbitrary team color
    expect(hq.team).toBe('green');

    await page.waitForTimeout(3000);

    await expect
      .poll(
        async () => {
          const length = await page.evaluate(
            'window.sprites.scene.objects.length'
          );

          return length;
        },
        {
          message: 'There should be more sprites after some time',
          timeout: 5000,
        }
      )
      .toBeGreaterThan(1);

    const endSprites = await page.evaluate('window.sprites.scene.objects');
    endSprites.forEach((element) => {
      // Sprites should be the same team as their HQ's
      expect(element.team).toBe('green');
    });
  });

  test('Spawning should not stack units', async ({ page }) => {
    await page.goto('localhost:5173?scenario=buildingHqSpawnStacking', {
      waitUntil: 'load',
    });
    const startSprites = (await getObject(page, 'sprites')) as SpriteState;
    expect(startSprites.data.length).toBe(1);
    await expect
      .poll(async () => {
        return await getObject(page, 'hq');
      })
      .toBeDefined();

    const hq = (await getObject(page, 'hq')) as Building;

    // Arbitrary team color
    expect(hq.team).toBe('green');

    await page.waitForTimeout(3000);

    await expect
      .poll(
        async () => {
          const sprites = (await getObject(page, 'sprites')) as SpriteState;
          return sprites.data.length;
        },
        {
          message: 'There should be more sprites after some time',
          timeout: 5000,
        }
      )
      .toBeGreaterThan(3);

    const endSprites = (await getObject(page, 'sprites')) as {
      data: TestSprite[];
    } & SpriteState;
    let prevCoordinates: { _x?: number; _y?: number } = {};
    endSprites.data.forEach((element: TestSprite, index: number) => {
      if (index === 0) {
        prevCoordinates = element.position;
        return;
      }
      expect(element.position._x).not.toBe(prevCoordinates._x);
      expect(element.position._y).not.toBe(prevCoordinates._y);
      prevCoordinates = element.position;
    });
  });
});
