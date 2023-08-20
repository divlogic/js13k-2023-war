import { describe, expect, test } from '@jest/globals'
import { build } from 'vite'
import { Buffer } from 'buffer'
const zlib = require('zlib')

describe('Package', () => {
  test('The final bundle size should not hit 13kb', async () => {
    const maxBites = 13312
    let size = 13312
    const foo = await build()
    zlib.gzipSync()

    expect(size).toBeLessThan(maxBites)
  })
})
