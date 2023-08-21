import { test, expect, Page } from '@playwright/test'
import { getSprites } from './utils'

test('Can click to attack', async ({ page }) => {
  await page.goto('localhost:5173')

  const starting = (await getSprites(page)).data[0]

  const startingX = starting._wx
  const startingY = starting._wy

  await page.mouse.click(300, 300, { delay: 1000 })
})
