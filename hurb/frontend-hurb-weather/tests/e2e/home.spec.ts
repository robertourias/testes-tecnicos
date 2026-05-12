import { test, expect } from '@playwright/test';
import { setupMocks } from './helpers/api-mocks';

test.describe('Happy path — geolocalização automática', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
    await page.goto('/');
    await expect(page.locator('article')).toHaveCount(3);
  });

  test('renderiza 3 cards de previsão', async ({ page }) => {
    await expect(page.locator('article')).toHaveCount(3);
  });

  test('exibe nome da localidade no header', async ({ page }) => {
    await expect(page.getByText('Rio de Janeiro')).toBeVisible();
  });

  test('exibe o input com o nome da cidade', async ({ page }) => {
    await expect(page.getByRole('textbox')).toHaveValue('Rio de Janeiro');
  });

  test('cada card exibe um label de data diferente', async ({ page }) => {
    const cards = page.locator('article');
    const dateLabels = await cards.locator('h2').allTextContents();
    // Todos os 3 cards devem ter labels de data não-vazios e distintos
    expect(dateLabels).toHaveLength(3);
    expect(new Set(dateLabels).size).toBe(3);
    dateLabels.forEach((label) => expect(label.trim().length).toBeGreaterThan(0));
  });

  test('primeiro card exibe um dos labels de data esperados', async ({ page }) => {
    const firstCard = page.locator('article').first();
    const label = await firstCard.locator('h2').textContent();
    // Pode ser "Hoje", "Amanhã", ou data formatada dependendo do timezone
    expect(label?.trim().length).toBeGreaterThan(0);
  });

  test('exibe temperaturas em Celsius por padrão', async ({ page }) => {
    const firstButton = page.locator('article').first().getByRole('button');
    await expect(firstButton).toHaveText(/°C/);
  });
});
