import { expect, test } from '@playwright/test';

test('Load profile page', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.getByText('Profile', { exact: true })).toBeVisible();
});
