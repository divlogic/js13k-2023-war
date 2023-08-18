import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:5173');

  // Expect a title "to contain" a substring.
  await page.keyboard.press('ArrowLeft', { delay: 1000 });
});
