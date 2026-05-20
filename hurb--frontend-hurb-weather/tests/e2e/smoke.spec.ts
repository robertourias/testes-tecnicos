import { test, expect } from '@playwright/test';
import { setupMocks } from './helpers/api-mocks';

test('deve carregar a página inicial e exibir a previsão do tempo', async ({ page }) => {
  await setupMocks(page);
  await page.goto('/');
  // Input de localidade presente (app carregou)
  await expect(page.getByRole('textbox')).toBeVisible();
  // 3 cards de previsão renderizados (fluxo completo funcionando)
  await expect(page.locator('article')).toHaveCount(3);
});
