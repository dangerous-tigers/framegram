import { test, expect } from '@playwright/test';

test('Load profile page', async ({ page }) => {
  await page.goto('/profile/284');
  await expect(page.getByText('ST4RFKR', { exact: true })).toBeVisible();
});
