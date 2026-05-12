import { test, expect } from '@playwright/test';
import { setupMocks } from './helpers/api-mocks';

test.describe('Toggle de temperatura', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page, 25);
    await page.goto('/');
    await expect(page.locator('article')).toHaveCount(3);
  });

  test('exibe temperaturas em Celsius por padrão', async ({ page }) => {
    const tempButton = page.locator('article').first().getByRole('button');
    await expect(tempButton).toHaveText(/°C/);
  });

  test('alterna para Fahrenheit ao clicar na temperatura', async ({ page }) => {
    const tempButton = page.locator('article').first().getByRole('button');
    await tempButton.click();
    await expect(tempButton).toHaveText(/°F/);
  });

  test('volta para Celsius ao clicar novamente', async ({ page }) => {
    const tempButton = page.locator('article').first().getByRole('button');
    await tempButton.click();
    await tempButton.click();
    await expect(tempButton).toHaveText(/°C/);
  });

  test('toggle afeta todos os 3 cards simultaneamente', async ({ page }) => {
    const firstButton = page.locator('article').first().getByRole('button');
    await firstButton.click();

    const allButtons = page.locator('article').getByRole('button');
    for (const btn of await allButtons.all()) {
      await expect(btn).toHaveText(/°F/);
    }
  });

  test('25°C converte corretamente para 77°F', async ({ page }) => {
    const tempButton = page.locator('article').first().getByRole('button');
    await expect(tempButton).toHaveText('25°C');
    await tempButton.click();
    await expect(tempButton).toHaveText('77°F');
  });
});
