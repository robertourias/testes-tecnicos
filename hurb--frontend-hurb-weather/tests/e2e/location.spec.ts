import { test, expect } from '@playwright/test';
import { setupMocks } from './helpers/api-mocks';

test.describe('Troca de localidade', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
    await page.goto('/');
    // Aguardar o carregamento inicial
    await expect(page.locator('article')).toHaveCount(3);
  });

  test('atualiza a localidade ao pressionar Enter', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('São Paulo');
    await input.press('Enter');

    // Aguardar novo ciclo de loading → cards
    await expect(page.locator('article')).toHaveCount(3);
    await expect(input).toHaveValue('São Paulo');
  });

  test('atualiza o label da localidade ao trocar cidade', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('Curitiba');
    await input.press('Enter');

    await expect(page.getByText('Curitiba')).toBeVisible();
  });

  test('mantém 3 cards após trocar de cidade', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('Fortaleza');
    await input.press('Enter');

    await expect(page.locator('article')).toHaveCount(3);
  });
});
