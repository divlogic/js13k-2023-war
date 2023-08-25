import { describe, expect, test } from '@jest/globals'
import { build, createLogger } from 'vite'

describe('Package', () => {
  test('The final bundle size should not hit 13kb', async () => {
    const maxBites = 13312
    let size = 13312

    const logger = createLogger()
    const loggerInfo = logger.info
    logger.info = (message, options) => {
      if (message.includes('gzip')) {
        // should only be one colon
        const sizeString = message.slice(message.indexOf(':') + 1)
        const regOutput = message.match(/gzip:\s([0-9.]+)\skB/)
        console.log('index: ', regOutput?.index)
        console.log('regOutput is: ', regOutput)
        const namedRegOutput = message.match(/gzip:\s(?<size>[0-9.]+)\skB/)
        console.log('namedRegOutput is: ', namedRegOutput)
      }
    }
    const buildResults = await build({ customLogger: logger })
    console.log(Object.keys(buildResults['output']))

    expect(size).toBeLessThan(maxBites)
  }, 200000)
})
