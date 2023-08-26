import { test } from '@playwright/test';
import fc from 'fast-check';
import type { CoordModel } from './models/models';
import PlayerController from './reals/PlayerController';
import MoveUp from './commands/MoveUp';

// const canvasSize = { width: 600, height: 600 };

test('Can move using wasd model based', async ({ page }) => {
  const asyncAssertions = async (): Promise<void> => {
    const allCommands = fc.commands(
      [fc.constant(new MoveUp(page, { x: 300, y: 300 }))],
      { maxCommands: 1 }
    );
    const property = fc.asyncProperty(allCommands, async (cmds) => {
      const s = (): { model: CoordModel; real: PlayerController } => ({
        model: { x: 300, y: 300 },
        real: new PlayerController(page),
      });
      await fc.asyncModelRun(s, cmds);
    });

    await fc.assert(property, { numRuns: 10 });
  };
  await page.goto('localhost:5173');
  await page.pause();

  await asyncAssertions();
});
