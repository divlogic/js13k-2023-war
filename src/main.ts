import { createScenario } from './scenario'

if (import.meta.env.DEV) {
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const scenario = params.get('scenario')
  console.log('scenario is: ', scenario)
  if (scenario === 'default' || scenario === null) {
    createScenario()
  }
} else {
  createScenario()
}
