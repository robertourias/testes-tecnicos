import { test, expect } from '@playwright/test';
import { setupMocks } from './helpers/api-mocks';

test.describe('Responsividade', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
  });

  test.describe('Mobile — 375px', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/');
      await expect(page.locator('article')).toHaveCount(3);
    });

    test('cards ficam empilhados em coluna', async ({ page }) => {
      const cards = page.locator('article');
      const boxes = await Promise.all(
        [0, 1, 2].map((i) => cards.nth(i).boundingBox())
      );

      // Em mobile todos os cards devem ter a mesma posição x (empilhados)
      expect(boxes[0]?.x).toBeCloseTo(boxes[1]?.x ?? 0, 0);
      expect(boxes[1]?.x).toBeCloseTo(boxes[2]?.x ?? 0, 0);
    });

    test('cada card ocupa a largura total disponível', async ({ page }) => {
      const firstCard = page.locator('article').first();
      const box = await firstCard.boundingBox();
      // Largura do card deve ser ≥ 280px em 375px viewport
      expect(box?.width).toBeGreaterThan(280);
    });

    test('input é acessível e não transborda', async ({ page }) => {
      const input = page.getByRole('textbox');
      const inputBox = await input.boundingBox();
      expect(inputBox?.width).toBeLessThanOrEqual(375);
    });

    test('botão de temperatura tem área de toque ≥ 44px', async ({ page }) => {
      const tempButton = page.locator('article').first().getByRole('button');
      const box = await tempButton.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    });
  });

  test.describe('Desktop — 1280px', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');
      await expect(page.locator('article')).toHaveCount(3);
    });

    test('cards ficam lado a lado em 3 colunas', async ({ page }) => {
      const cards = page.locator('article');
      const boxes = await Promise.all(
        [0, 1, 2].map((i) => cards.nth(i).boundingBox())
      );

      // Em desktop os cards devem ter posições x diferentes (lado a lado)
      expect(boxes[0]?.x).toBeLessThan(boxes[1]?.x ?? 0);
      expect(boxes[1]?.x).toBeLessThan(boxes[2]?.x ?? 0);
    });

    test('cada card ocupa aproximadamente 1/3 do grid', async ({ page }) => {
      const cards = page.locator('article');
      const [box0, box1] = await Promise.all([
        cards.nth(0).boundingBox(),
        cards.nth(1).boundingBox(),
      ]);
      // Largura dos cards deve ser similar (mesma coluna)
      expect(Math.abs((box0?.width ?? 0) - (box1?.width ?? 0))).toBeLessThan(10);
    });
  });
});
