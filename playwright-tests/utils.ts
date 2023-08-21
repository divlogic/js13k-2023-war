import { Page } from '@playwright/test'

export async function getSprites(page: Page) {
  const spritesHandle = await page.evaluateHandle(() => {
    return window.sprites
  })

  return await spritesHandle.jsonValue()
}
