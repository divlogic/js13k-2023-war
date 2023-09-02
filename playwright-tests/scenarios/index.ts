import { npcBehavior } from './npc-behavior';

import { playerMovement } from './player-movement';
import { npcAcquireTarget } from './npc-acquire-target';
import { weapons } from './weapons';
import { playerAttacking } from './player-attacking';

export const playwrightScenes: Record<string, () => void> = {
  npcBehavior,
  playerMovement,
  npcAcquireTarget,
  weapons,
  playerAttacking,
};
