import { createScenario } from './scenario/scenario'
import { npcBehaviorScene } from '../playwright-tests/scenarios/npc-behavior'

if (import.meta.env.DEV) {
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const scenario = params.get('scenario')
  console.log('scenario is: ', scenario)
  console.log(scenario === null)
  if (scenario === 'default' || scenario === null) {
    createScenario()
  } else if (scenario === 'npc-behavior') {
    npcBehaviorScene()
  }
} else {
  createScenario()
}
