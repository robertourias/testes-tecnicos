import { test, expect } from '@playwright/test';

test('deve carregar a página inicial', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('HURB Weather');
});
