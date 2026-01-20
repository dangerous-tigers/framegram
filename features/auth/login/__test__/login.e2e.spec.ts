import { expect, test } from '@playwright/test';

test('Проверка корректности перевода на русский', async ({ page, context }) => {
  await context.addCookies([
    {
      name: 'NEXT_LOCALE',
      value: 'ru',
      domain: 'localhost',
      path: '/',
    },
  ]);

  await page.goto('/login');

  await expect(page.getByRole('heading', { name: 'Вход' })).toBeVisible();
  await context.addCookies([
    {
      name: 'NEXT_LOCALE',
      value: 'en',
      domain: 'localhost',
      path: '/',
    },
  ]);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
});
