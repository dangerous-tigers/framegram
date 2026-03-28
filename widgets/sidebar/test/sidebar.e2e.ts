import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('link', { name: 'Feed' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Messenges' })).toBeVisible();
});
