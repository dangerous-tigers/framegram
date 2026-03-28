import path from 'path';

import { test } from '@playwright/test';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('authenticate', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('meyigox155@oremal.com');
  await page.getByRole('textbox', { name: 'Password Show password' }).fill('Ex4mple!111');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'Feed' }).click();
  await page.getByRole('link', { name: 'My profile' }).click();

  await page.context().storageState({ path: authFile });
});
