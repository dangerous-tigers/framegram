import { expect, test } from '@playwright/test';

test('проверка авторизации', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  const emailInput = await page.getByRole('textbox', { name: 'Email' });
  await emailInput.fill('meyigox155@oremal.com');
  const passwordInput = await page.getByRole('textbox', { name: 'Password Show password' });
  await passwordInput.fill('Ex4mple!111');
  const loginButton = await page.getByRole('button', { name: 'Sign In' });
  await loginButton.click();

  await expect(page).toHaveURL(/profile/);
});

test('проверка авторизации с неверными данными', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  const emailInput = await page.getByRole('textbox', { name: 'Email' });
  await emailInput.fill('meyigox155@oremal.com');
  const passwordInput = await page.getByRole('textbox', { name: 'Password Show password' });
  await passwordInput.fill('Ex4mple!1111');

  const loginButton = await page.getByRole('button', { name: 'Sign In' });
  await loginButton.click();

  await expect(page.getByRole('listitem')).toBeVisible();
  await expect(page).toHaveURL(/login/);
});
