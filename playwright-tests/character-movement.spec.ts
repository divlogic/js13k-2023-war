import { test, expect } from '@playwright/test'
import { getSprites } from './utils'

test('Can move using wasd', async ({ page }) => {
  await page.goto('localhost:5173')

  const starting = (await getSprites(page)).data[0]

  const startingX = starting._wx
  const startingY = starting._wy

  await page.keyboard.press('a', { delay: 1000 })
  const afterMovingLeft = (await getSprites(page)).data[0]
  const afterLeftX = afterMovingLeft._wx
  const afterLeftY = afterMovingLeft._wy
  await expect(afterLeftX).toBeLessThan(startingX)
  await expect(afterLeftY).toBe(startingY)

  await page.keyboard.press('s', { delay: 1000 })
  const afterMovingDown = (await getSprites(page)).data[0]
  const afterDownX = afterMovingDown._wx
  const afterDownY = afterMovingDown._wy
  await expect(afterDownX).toBe(afterLeftX)
  await expect(afterDownY).toBeGreaterThan(afterLeftY)

  await page.keyboard.press('d', { delay: 1000 })
  const afterMovingRight = (await getSprites(page)).data[0]
  const afterRightX = afterMovingRight._wx
  const afterRightY = afterMovingRight._wy
  await expect(afterRightX).toBeGreaterThan(afterDownX)
  await expect(afterRightY).toBe(afterDownY)

  await page.keyboard.press('w', { delay: 1000 })
  const afterMovingUp = (await getSprites(page)).data[0]
  const afterUpX = afterMovingUp._wx
  const afterUpY = afterMovingUp._wy
  await expect(afterUpX).toBe(afterRightX)
  await expect(afterUpY).toBeLessThan(afterRightY)
})
