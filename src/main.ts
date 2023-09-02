import { createScenario } from './scenario/scenario';
import { playwrightScenes } from '../playwright-tests/scenarios';

if (import.meta.env.DEV) {
  // const testScenes = ({
  //   pl
  //   npcBehaviorScene,
  //   playerMovementScenario,
  //   npcAcquireTargetScene,
  //   weapons,
  //   playerAttacking,
  // } = playwrightScenes);
  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const scenario = params.get('scenario');
  console.log('scenario is: ', scenario);
  console.log(scenario === null);

  if (scenario === 'default' || scenario === null) {
    createScenario();
  } else if (Object.hasOwn(playwrightScenes, scenario)) {
    playwrightScenes[scenario]();
  }
} else {
  createScenario();
}
