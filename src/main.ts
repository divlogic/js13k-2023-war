import { createScenario } from './scenario/scenario';
import {
  npcBehaviorScene,
  playerMovementScenario,
} from '../playwright-tests/scenarios/index';

if (import.meta.env.DEV) {
  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const scenario = params.get('scenario');
  console.log('scenario is: ', scenario);
  console.log(scenario === null);
  if (scenario === 'default' || scenario === null) {
    createScenario();
  } else if (scenario === 'npc-behavior') {
    npcBehaviorScene();
  } else if (scenario === 'player-movement') {
    playerMovementScenario();
  }
} else {
  createScenario();
}
