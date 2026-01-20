import { test, expect } from '@playwright/test';

test('Проверка работы ссылок', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  const forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password' });
  const registerLink = page.getByRole('link', { name: 'Sign Up' }).nth(1);

  await expect(forgotPasswordLink).toBeVisible();
  await expect(registerLink).toBeVisible();

  await forgotPasswordLink.click();
  await expect(page).toHaveURL(/forgot-password/);

  await page.goto('http://localhost:3000/login');

  await registerLink.click();
  await expect(page).toHaveURL('/registration');
});
