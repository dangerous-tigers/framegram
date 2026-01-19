import { expect, test } from '@playwright/test';

test('Load login page with ru locale (cookie)', async ({ page, context }) => {
  await context.addCookies([
    {
      name: 'NEXT_LOCALE',
      value: 'ru',
      domain: 'localhost',
      path: '/',
    },
  ]);

  await page.goto('/login');

  await expect(page.getByText('Вход', { exact: true })).toBeVisible();
});
