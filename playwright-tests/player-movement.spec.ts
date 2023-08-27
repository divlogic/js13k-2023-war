import { test } from '@playwright/test';
import fc from 'fast-check';
import type { CoordModel } from './models/models';
import PlayerController from './reals/PlayerController';
import MoveUp from './commands/MoveUp';
import MoveDown from './commands/MoveDown';
import MoveLeft from './commands/MoveLeft';
import MoveRight from './commands/MoveRight';

// const canvasSize = { width: 600, height: 600 };

test('Can move using wasd model based', async ({ page }) => {
  const asyncAssertions = async (): Promise<void> => {
    const allCommands = fc.commands(
      [
        fc.constant(new MoveUp(page, { x: 300, y: 300 })),
        fc.constant(new MoveDown(page, { x: 300, y: 300 })),
        fc.constant(new MoveLeft(page, { x: 300, y: 300 })),
        fc.constant(new MoveRight(page, { x: 300, y: 300 })),
      ],
      { maxCommands: 1 }
    );

    const property = fc.asyncProperty(allCommands, async (cmds) => {
      const playerController = new PlayerController(page);
      const currentPosition = await playerController.grabPosition();

      const initialStateProvider = (): {
        model: CoordModel;
        real: PlayerController;
      } => ({
        model: currentPosition,
        real: playerController,
      });
      await fc.asyncModelRun(initialStateProvider, cmds);
    });

    await fc.assert(property, { numRuns: 100, verbose: false });
  };
  await page.goto('localhost:5173?scenario=player-movement');

  await asyncAssertions();
});
