import { test, expect } from '@playwright/test';
import { getObject } from './utils';

const testObj = { foo: 'bar' };
function testLog(str: string) {
  console.log(str);
  return testObj;
}

test('NPC can move to a target', async ({ page }) => {
  await page.goto('localhost:5173?scenario=npc-behavior');
  /**
   * The ways to test this, off the top of my head:
   * 1. Just keep checking the values over time and making sure
   * the enemy sprite just gets closer.
   * 2.Grab the values over and over until
   * some condition (timeout with distance === 0 maybe)
   * and then when that condition is met, confirm that it
   * happens reasonably enough
   *
   * Maybe there can be multiple scenarios, like obstacles vs no obstacles
   *
   */

  // Given that the enemy has the player as the target
  // The enemy should move towards that target
  const player = await getObject(page, 'player');
  const enemy = await getObject(page, 'enemy');

  // Given that the enemy sprite has a target
  expect(enemy.target).toBeDefined();
  expect(enemy.target.position._x).toBe(player.position._x);
  expect(enemy.target.position._y).toBe(player.position._y);
  // And that target is in a different position
  expect(enemy.position._x).not.toBe(player.position._x);
  expect(enemy.position._y).not.toBe(player.position._y);

  // Over time, the enemy sprite should move closer to the target's position

  await expect
    .poll(
      async () => {
        const enemy = await getObject(page, 'enemy');
        return { x: enemy.position._x, y: enemy.position._y };
      },
      {
        message: 'The enemy sprite should move to the target location',
      }
    )
    .toEqual({ x: player.position._x, y: player.position._y });
});
